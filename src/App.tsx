import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import amplifyConfig from "./aws-exports";
import AppRoutes from "./routes/AppRoutes";

Amplify.configure(amplifyConfig);

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <AppRoutes user={user} signOut={signOut} />
        )}
      </Authenticator>
    </div>
  );
}

export default App;
