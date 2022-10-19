import React from "react";
import { AuthEventData, AmplifyUser } from "@aws-amplify/ui";
import { Route, Link, Routes } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import Home from "../views/Home";
import ViewBoards from "../views/ViewBoards";
import ViewBoard from "../views/ViewBoard";
import CreateBoard from "../views/CreateBoard";

interface Props extends React.PropsWithChildren {
  user: AmplifyUser | undefined;
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}

const AppRoutes = (props: Props) => {
  console.log({ user: props.user });
  return (
    <div>
      <div className="header">
        <h1 className="app-name">Idea Voting App</h1>
        <FaSignOutAlt onClick={props.signOut} />
        {/* <Link to="/">
          <button>Home</button>
        </Link> */}
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
