import { Button, Flex } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { IoTrashOutline } from "react-icons/io5";

import API from "../utils/API";

const ViewBoards: React.FC<ViewBoardsProps> = ({ user }) => {
  const [boards, setBoards] = useState<BoardListData[]>([]);
  const navigate = useNavigate();

  const getBoards = async () => {
    const res = await API.get<BoardListData[]>({ path: "/boards" });
    setBoards(res);
  };

  useEffect(() => {
    navigate("/boards");
    getBoards();
  }, []);

  const deleteBoard = async (id: string) => {
    await API.delete<BoardData>({ path: `/boards/${id}` });
    getBoards();
    toast("board deleted", {
      transition: Flip,
    });
  };

  return (
    <div className="view">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <h1>Boards</h1>
        <Button onClick={() => navigate("/")}>Home</Button>
      </Flex>
      <div className="app-presentation__wrapper">
        <p className="app-presentation">
          Select a board to add ideas open for voting.
        </p>
      </div>
      <div className="card__wrapper">
        {boards.map(({ boardName, description, id, ownerId }) => {
          return (
            <div className="board-card jc-between" key={id}>
              <div
                className="card__info"
                onClick={() => navigate(`/boards/${id}`)}
              >
                <p className="card__title">{boardName}</p>
                {description === "" ? (
                  <p className="no-desc__message">No description available</p>
                ) : (
                  <p>{description}</p>
                )}
              </div>
              <div className="trash-icon__wrapper">
                {ownerId === user.username && (
                  <IoTrashOutline
                    onClick={() => deleteBoard(id)}
                    className="trash-icon"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBoards;
