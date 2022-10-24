import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes/AppRoutes";
import amplifyConfig from "./aws-exports";

Amplify.configure(amplifyConfig);

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <AppRoutes user={user} signOut={signOut} />
            <ToastContainer />
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
