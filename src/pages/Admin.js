import React, { useEffect, useState } from "react";

import Button from "reactstrap/lib/Button";
import Input from "reactstrap/lib/Input";
// import { StyleSheet, View } from "react";
import { useNavigate } from "react-router";
import { func } from "prop-types";
import { Alert } from "reactstrap";

function UserAdmin() {
  const [Users_username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("id");
    if (userFromLocalStorage == null) {
      navigate("/login");
    }
  }, []);
  const viewDevicesAdmin = (e) => {
    navigate("/viewDevicesOfUser");
  };
  const viewConsumptionsAdmin = (e) => {
    navigate("/viewConsumptionsOfUser");
  };
  const editDevicesOfUser = (e) => {
    navigate("/editDevicesOfUser");
  };

  const deleteUser = (e) => {
    const selectedUser = localStorage.getItem("user_id");
    e.preventDefault();
    // const device = { id, address, description, maxim_hourly_energy };
    fetch("http://localhost:8080/users/".concat(selectedUser), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(device),
    })
      // .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response);
        // localStorage.setItem("id", JSON.stringify(Response.id));
        // localStorage.setItem("username", JSON.stringify(Response.username));
        // localStorage.setItem("role", JSON.stringify(Response.role));
        alert("Deleted succesfully!");
      });
  };
  // const updateDevices = (e) => {
  //   navigate("/updateDeviceToUser");
  // };
  // const deleteDevices = (e) => {
  //   navigate("/deleteDeviceToUser");
  // };
  const selectUser = (e) => {
    // navigate("/view devices of a user");
    const userFromLocalStorage = localStorage.getItem("id");

    if (userFromLocalStorage != null) {
      const path = "http://localhost:8080/users/username/".concat(
        Users_username
      );
      fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then((Response) => {
          console.log(Response);
          //   Response = JSON.stringify(Response);
          console.log("Response id is " + Response.id);
          localStorage.setItem("user_id", Response.id);
          // console.log(JSON.stringify(Response));
          //   const showContent = document.getElementById("pDevicesOfUser");
          //   showContent.textContent = Response;
        });
    }

    // localStorage.setItem("users_id", Users_username);
  };

  return (
    <>
      <div>
        {/* <View style={styles.screenContainer}> */}
        <Button type="button" onClick={viewDevicesAdmin}>
          View all of user's devices
        </Button>
        <Button type="button" onClick={editDevicesOfUser}>
          Edit devices of user
        </Button>
        {/* <Button type="button" onClick={updateDevices}>
          Update device
        </Button>
        <Button type="button" onClick={deleteDevices}>
          Delete device
        </Button> */}
        <Button type="button" onClick={viewConsumptionsAdmin}>
          View all of user's monitorizations
        </Button>
        <Button type="button" onClick={selectUser}>
          Select user
        </Button>
        <Button type="button" onClick={deleteUser}>
          Delete User
        </Button>
        <Input
          type="text"
          id="Users_username"
          name="Users_username"
          placeholder="User's username"
          value={Users_username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        {/* </View> */}
      </div>
    </>
  );
}

function UserDevices() {
  const navigate = useNavigate();
  const userFromLocalStorage = localStorage.getItem("user_id");
  console.log(userFromLocalStorage);

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

function UserMonitorizations() {
  //defapt e un add device
  // const [description, setDescription] = useState("");
  // const [address, setAddress] = useState("");
  // const [maxim_hourly_energy, setMaxim_hourly_energy] = useState("");

  const navigate = useNavigate();
  const userFromLocalStorage = localStorage.getItem("user_id");

  useEffect(() => {
    // console.log("am ajuns aicis");
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

// function EditDevices() {
//   const navigate = useNavigate();
//   const userFromLocalStorage = localStorage.getItem("user_id");

//   useEffect(() => {
//     // console.log("am ajuns aicis");
//     if (userFromLocalStorage != null) {
//       const path = "http://localhost:8080/users/getClientConsumtions/".concat(
//         userFromLocalStorage.replaceAll('"', "")
//       );
//       fetch(path, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((Response) => Response.json())
//         .then((Response) => {
//           Response = JSON.stringify(Response);

//           const showContent = document.getElementById("pConsumptionsOfUser");
//           showContent.textContent = Response;
//         });
//     } else {
//       navigate("/login");
//     }
//   }, []);

//   return (
//     <>
//       <div id="divConsumptionsOfUser">
//         <p id="pConsumptionsOfUser" />
//         {/* <Button type="button" onClick={butonYourDevices}>
//           Login
//         </Button> */}
//       </div>
//     </>
//   );
// }

function EditDevicesOfUser() {
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [maxim_hourly_energy, setMaxim_hourly_energy] = useState("");

  const navigate = useNavigate();
  const userFromLocalStorage = localStorage.getItem("user_id");

  useEffect(() => {
    if (userFromLocalStorage == null) navigate("/login");
  }, []);

  const addDevice = (e) => {
    console.log(
      "http://localhost:8080/users/addDeviceToClient/".concat(
        localStorage.getItem("user_id")
      )
    );
    e.preventDefault();
    const device = { address, description, maxim_hourly_energy };
    fetch(
      "http://localhost:8080/users/addDeviceToClient/".concat(
        localStorage.getItem("user_id")
      ),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(device),
      }
    )
      .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response);
        // localStorage.setItem("id", JSON.stringify(Response.id));
        // localStorage.setItem("username", JSON.stringify(Response.username));
        // localStorage.setItem("role", JSON.stringify(Response.role));
        alert("Inserted succesfully!");
      });
  };
  const updateDevice = (e) => {
    e.preventDefault();
    const device = { id, address, description, maxim_hourly_energy };
    fetch("http://localhost:8080/device/".concat(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response);
        // localStorage.setItem("id", JSON.stringify(Response.id));
        // localStorage.setItem("username", JSON.stringify(Response.username));
        // localStorage.setItem("role", JSON.stringify(Response.role));
        alert("Updated succesfully!");
      });
  };
  const deleteDevice = (e) => {
    e.preventDefault();
    // const device = { id, address, description, maxim_hourly_energy };
    fetch("http://localhost:8080/device/".concat(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(device),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log(Response);
        // localStorage.setItem("id", JSON.stringify(Response.id));
        // localStorage.setItem("username", JSON.stringify(Response.username));
        // localStorage.setItem("role", JSON.stringify(Response.role));
        alert("Deleted succesfully!");
      });
  };
  return (
    <>
      <div>
        <Input
          type="text"
          id="DeviceId"
          name="DeviceId"
          placeholder="Device id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="text"
          id="DeviceAddress"
          name="DeviceAddress"
          placeholder="Device address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type="text"
          id="DeviceDescription"
          name="DeviceDescription"
          placeholder="Device description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          id="DeviceMaxim_hourly_energy"
          name="DeviceMaxim_hourly_energy"
          placeholder="Device maxim hourly energy"
          value={maxim_hourly_energy}
          onChange={(e) => setMaxim_hourly_energy(e.target.value)}
        />
        <Button type="button" onClick={addDevice}>
          Add Device
        </Button>
        <Button type="button" onClick={updateDevice}>
          Update Device
        </Button>
        <Button type="button" onClick={deleteDevice}>
          Delete Device
        </Button>
        {/* </View> */}
      </div>
    </>
  );
}

export {
  UserAdmin,
  UserDevices,
  UserMonitorizations,
  EditDevicesOfUser,
  // UpdateDeviceOfUser,
  // DeleteDeviceOfUser,
};
