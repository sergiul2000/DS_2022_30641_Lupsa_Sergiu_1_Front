import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./navigation-bar";
import Home from "./home/home";
import PersonContainer from "./person/person-container";
import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";
import Login from "./pages/Login";
import {
  UserClient,
  YourDevices,
  ViewAllMonitorizations,
} from "./pages/Client";
import {
  UserAdmin,
  UserDevices,
  UserMonitorizations,
  EditDevicesOfUser,
  EditUser,
  // UpdateDeviceOfUser,
  // DeleteDeviceOfUser,
} from "./pages/Admin";
import { Chat } from "./pages/Chat.js";
import { UserRegister } from "./pages/Register";

/*
    Namings: https://reactjs.org/docs/jsx-in-depth.html#html-tags-vs.-react-components
    Should I use hooks?: https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both
*/
function App() {
  return (
    <div className={styles.back}>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/person" element={<PersonContainer />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/client" element={<UserClient />} />

        <Route exact path="/admin" element={<UserAdmin />} />

        <Route exact path="/yourDevices" element={<YourDevices />} />

        <Route exact path="/updateUser" element={<EditUser />} />

        <Route exact path="/chat" element={<Chat />} />

        <Route
          exact
          path="/yourConsumptions"
          element={<ViewAllMonitorizations />}
        />

        <Route exact path="/viewDevicesOfUser" element={<UserDevices />} />

        <Route
          exact
          path="/viewConsumptionsOfUser"
          element={<UserMonitorizations />}
        />

        <Route
          exact
          path="/editDevicesOfUser"
          element={<EditDevicesOfUser />}
        />
        {/* <Route
          exact
          path="/updateDeviceToUser"
          element={<UpdateDeviceOfUser />}
        />
        <Route
          exact
          path="/deleteDeviceToUser"
          element={<DeleteDeviceOfUser />}
        /> */}

        <Route exact path="/register" element={<UserRegister />} />

        {/*Error*/}
        <Route exact path="/error" element={<ErrorPage />} />

        <Route element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
