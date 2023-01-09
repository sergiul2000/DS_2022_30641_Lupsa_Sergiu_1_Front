import React, { useEffect, useState } from "react";

import Button from "reactstrap/lib/Button";
import Input from "reactstrap/lib/Input";
// import { StyleSheet, View } from "react";
import { useNavigate } from "react-router";
import { func } from "prop-types";
import SockJsClient from "react-stomp";
import { Alert } from "reactstrap";

function UserClient() {
  const navigate = useNavigate();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("id");
    if (userFromLocalStorage == null) {
      navigate("/login");
    }
  }, []);
  const viewDevices = (e) => {
    navigate("/yourDevices");
  };
  const viewConsumptions = (e) => {
    navigate("/yourConsumptions");
  };

  let onMessageReceived = (msg) => {
    console.log(msg);
    alert(msg);
  };
  let onConnected = () => {
    console.log("connected");
  };
  return (
    <>
      <div>
        <SockJsClient
          url="http://localhost:8080/ws-message"
          topics={["/topic/message"]}
          onConnect={onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
        />
        {/* <View style={styles.screenContainer}> */}
        <Button type="button" onClick={viewDevices}>
          View all your devices
        </Button>
        <Button type="button" onClick={viewConsumptions}>
          View all monitorizations
        </Button>
        {/* </View> */}
      </div>
    </>
  );
}

function YourDevices() {
  const navigate = useNavigate();
  const userFromLocalStorage = localStorage.getItem("id");

  // console.log(userFromLocalStorage);

  // const butonYourDevices = (e) => {
  //   if (!userFromLocalStorage) {
  //     navigate("/login");
  //   }
  // };
  useEffect(() => {
    if (userFromLocalStorage != null) {
      const path = "http://localhost:8080/users/getClientDevices/".concat(
        userFromLocalStorage.replaceAll('"', "")
      );
      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then((Response) => {
          Response = JSON.stringify(Response);
          // console.log(JSON.stringify(Response));
          const showContent = document.getElementById("pDevicesOfUser");
          showContent.textContent = Response;
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div id="divDevicesOfUser">
        <p id="pDevicesOfUser" />
        {/* <Button type="button" onClick={butonYourDevices}>
          Login
        </Button> */}
      </div>
    </>
  );
}

function ViewAllMonitorizations() {
  //defapt e un add device
  // const [description, setDescription] = useState("");
  // const [address, setAddress] = useState("");
  // const [maxim_hourly_energy, setMaxim_hourly_energy] = useState("");

  const navigate = useNavigate();
  const userFromLocalStorage = localStorage.getItem("id");

  useEffect(() => {
    console.log("am ajuns aicis");
    if (userFromLocalStorage != null) {
      const path = "http://localhost:8080/users/getClientConsumtions/".concat(
        userFromLocalStorage.replaceAll('"', "")
      );
      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then((Response) => {
          Response = JSON.stringify(Response);

          const showContent = document.getElementById("pConsumptionsOfUser");
          showContent.textContent = Response;
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* <h>Add your device data</h>
      <Input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="text"
        id="address"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        type="number"
        id="maxim_hourly_energy"
        name="maxim_hourly_energy"
        placeholder="Maxim hourly energy"
        value={maxim_hourly_energy}
        onChange={(e) => setMaxim_hourly_energy(e.target.value)}
      /> */}

      <div id="divConsumptionsOfUser">
        <p id="pConsumptionsOfUser" />
        {/* <Button type="button" onClick={butonYourDevices}>
          Login
        </Button> */}
      </div>
    </>
  );
}

// const styles = StyleSheet.create({
//   screenContainer: { flex: 1, justifyContent: "center", padding: 16 },
// });

export { UserClient, YourDevices, ViewAllMonitorizations };
