import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [privateBoardID, setPrivateBoardID] = useState("");

  return (
    <div>
      <Link to="/boards">
        <Button>View Public Boards</Button>
      </Link>
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          value={privateBoardID}
          onChange={(e) => setPrivateBoardID(e.target.value)}
          placeholder="private board ID"
        />
        <Link to={`/boards/${privateBoardID}`}>
          <Button>View Private Board</Button>
        </Link>
      </div>
      <Link to="/createboard/">
        <Button>Create New Board</Button>
      </Link>
    </div>
  );
};

export default Home;
