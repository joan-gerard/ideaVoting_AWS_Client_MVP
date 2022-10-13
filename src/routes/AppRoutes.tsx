import React from "react";
import { AuthEventData, AmplifyUser } from "@aws-amplify/ui";
import { Route, Link, Routes } from "react-router-dom";

import Home from "../views/Home";
import ViewBoards from "../views/ViewBoards";
import ViewBoard from "../views/ViewBoard";
import CreateBoard from "../views/CreateBoard";

interface Props extends React.PropsWithChildren {
  user: AmplifyUser | undefined;
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}

const AppRoutes = (props: Props) => {
  return (
    <div>
      <div className="nav">
        <Link to="/">
          <button>Home</button>
        </Link>

        <h1>Idea Voting App</h1>

        <button onClick={props.signOut}>Sign Out</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<ViewBoards />} />
        <Route path="/boards/:id" element={<ViewBoard />} />

        <Route path="/createboard/" element={<CreateBoard />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
