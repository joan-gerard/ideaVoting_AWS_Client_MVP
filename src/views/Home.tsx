import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Flex } from "@aws-amplify/ui-react";
import { Flip, toast } from "react-toastify";
import { AxiosError } from "axios";
import { BsClipboardPlus } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

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
      toast("Please, enter valid board id!", {
        transition: Flip,
      });
    }
  };

  return (
    <div className="home">
      <div className="app-presentation__wrapper">
        <p className="app-presentation">
          An app where you can create voting boards, suggest ideas and vote on
          ideas.
        </p>
      </div>
      <div className="links">
        <div onClick={() => navigate("/boards")} className="card">
          <Flex direction="row" alignItems="center">
            <div className="icon__wrapper">
              <BsClipboardPlus className="test" />
            </div>
            <div className="card__info">
              <p className="card__title">Public Boards</p>
              <p>View public boards created by yourself and others</p>
            </div>
          </Flex>
        </div>
        <div onClick={() => navigate("/createboard/")} className="card">
          <Flex direction="row" alignItems="center">
            <div className="icon__wrapper">
              <BsClipboardPlus className="test" />
            </div>
            <div className="card__info">
              <p className="card__title">New Board</p>
              <p>Create a new board</p>
            </div>
          </Flex>
        </div>
        <div onClick={() => navigate("")} className="card">
          <Flex direction="row" alignItems="center">
            <div className="icon__wrapper">
              <BiSearchAlt className="test" />
            </div>
            <div className="card__info">
              <p className="card__title">Find Board</p>
              <p>Find a public or a private board using a board id</p>
            </div>
          </Flex>
        </div>
        <div>
          {/* <input
            type="text"
            value={privateBoardID}
            onChange={(e) => setPrivateBoardID(e.target.value)}
            placeholder="private board ID"
          /> */}
          {/* <Link to={`/boards/${privateBoardID}`}> */}
          <Button onClick={() => viewPrivateBoard()}>View Private Board</Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
