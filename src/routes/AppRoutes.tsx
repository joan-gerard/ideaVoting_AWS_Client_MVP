import React from "react";
import { AuthEventData, AmplifyUser } from "@aws-amplify/ui";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import Home from "../views/Home";
import ViewBoards from "../views/ViewBoards";
import ViewBoard from "../views/ViewBoard";
import CreateBoard from "../views/CreateBoard";
import './AppRoutes.scss'

interface Props extends React.PropsWithChildren {
  user: AmplifyUser | undefined;
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}

const AppRoutes = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <h1 className="app-name" onClick={() => navigate("/")}>
          Idea Voting App
        </h1>
        <div
          className="signout-icon__wrapper icon__wrapper"
          onClick={props.signOut}
        >
          <FaSignOutAlt className="signout-icon" />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<ViewBoards user={props.user} />} />
        <Route path="/boards/:id" element={<ViewBoard />} />

        <Route path="/createboard/" element={<CreateBoard />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
