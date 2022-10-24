import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { Flip, toast } from "react-toastify";
import { BsClipboardPlus } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";

import API from "../utils/API";

const Home = () => {
  const [privateBoardID, setPrivateBoardID] = useState("");
  const [showBoardSearch, setShowBoardSearch] = useState(false);
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
    const allPublicBoards = await API.get<BoardListData[]>({
      path: "/boards",
    });

    if (
      allPrivateBoards.some((board) => {
        return board.id === privateBoardID;
      }) ||
      allPublicBoards.some((board) => {
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
    <div className="view">
      <div className="page-presentation__wrapper">
        <p className="page-presentation">
          An app where you can create voting boards, suggest ideas and vote on
          ideas.
        </p>
      </div>
      <div className="cards__wrapper">
        <div onClick={() => navigate("/boards")} className="card">
          <div className="test">
            <div className="icon__wrapper">
              <FaListUl className="icon" />
            </div>
            <div className="card__info">
              <p className="card__title">Public Boards</p>
              <p>View public boards created by yourself and others</p>
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/createboard/")} className="card">
          <div className="test">
            <div className="icon__wrapper">
              <BsClipboardPlus className="icon" />
            </div>
            <div className="card__info">
              <p className="card__title">New Board</p>
              <p>Create a new board</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setShowBoardSearch(!showBoardSearch)}
          className="card"
        >
          <div className="test">
            <div className="icon__wrapper">
              <BiSearchAlt className="icon" />
            </div>
            <div className="card__info">
              <p className="card__title">Find Board</p>
              <p>Find a public or a private board using a board id</p>
            </div>
          </div>
        </div>
        <div>
          {showBoardSearch && (
            <div className="find-board__form">
              <input
                type="text"
                value={privateBoardID}
                onChange={(e) => setPrivateBoardID(e.target.value)}
                placeholder="enter board ID..."
              />
              <Button onClick={() => viewPrivateBoard()} size="small">
                View Board
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
