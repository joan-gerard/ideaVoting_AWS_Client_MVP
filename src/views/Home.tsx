import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { Flip, toast } from "react-toastify";
import { AxiosError } from "axios";

import API from "../utils/API";

const Home = () => {
  const [privateBoardID, setPrivateBoardID] = useState("");
  const navigate = useNavigate();

  const viewPrivateBoard = async () => {
    if (!privateBoardID) {
      toast("Please enter a board id", {
        transition: Flip,
      });
      return;
    }

    const allPrivateBoards = await API.get<BoardListData[]>({
      path: "/private-boards",
    });

    if (
      allPrivateBoards.some((board) => {
        return board.id === privateBoardID;
      })
    ) {
      navigate(`/boards/${privateBoardID}`);
    } else {
      toast("Board with this id does not exist", {
        transition: Flip,
      });
    }
  };

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
        {/* <Link to={`/boards/${privateBoardID}`}> */}
        <Button onClick={() => viewPrivateBoard()}>View Private Board</Button>
        {/* </Link> */}
      </div>
      <Link to="/createboard/">
        <Button>Create New Board</Button>
      </Link>
    </div>
  );
};

export default Home;
