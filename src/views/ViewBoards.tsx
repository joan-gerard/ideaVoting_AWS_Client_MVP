import { Button, Flex } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { IoTrashOutline } from "react-icons/io5";
import { BsClipboardPlus } from "react-icons/bs";

import API from "../utils/API";
import "./style/ViewBoards.scss";

const ViewBoards: React.FC<ViewBoardsProps> = ({ user }) => {
  const [boards, setBoards] = useState<BoardListData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getBoards = async () => {
    setIsLoading(true);
    const res = await API.get<BoardListData[]>({ path: "/boards" });
    setIsLoading(false);
    setBoards(res);
  };

  useEffect(() => {
    navigate("/boards");
    getBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Button onClick={() => navigate("/")} variation="primary">Home</Button>
      </Flex>
      <div className="page-presentation__wrapper">
        <p className="page-presentation">
          Select a board to add ideas open for voting.
        </p>
      </div>
      <div className="cards__wrapper">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {boards.length >= 1 ? (
              <>
                {boards.map(({ boardName, description, id, ownerId }) => {
                  return (
                    <div className="board-card jc-between" key={id}>
                      <div
                        className="card__info"
                        onClick={() => navigate(`/boards/${id}`)}
                      >
                        <p className="card__title">{boardName}</p>
                        {description === "" ? (
                          <p className="no-desc__message">
                            No description available
                          </p>
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
              </>
            ) : (
              <div
                className="board-card jc-between"
                onClick={() => navigate(`/createboard/`)}
              >
                <div className="card__info">
                  <p className="card__title">
                    There are no boards at the moment!
                  </p>
                  <p className="no-desc__message">Click to create a board</p>
                </div>
                <div className="create-icon__wrapper">
                  <BsClipboardPlus className="create-icon" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewBoards;
