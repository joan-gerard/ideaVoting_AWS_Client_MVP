import { Button } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../utils/API";

const ViewBoards: React.FC<ViewBoardsProps> = ({ user }) => {
  const [boards, setBoards] = useState<BoardListData[]>([]);

  const getBoards = async () => {
    const res = await API.get<BoardListData[]>({ path: "/boards" });
    setBoards(res);
  };

  useEffect(() => {
    getBoards();
  }, []);
  console.table(boards);
  console.log(user.username);

  const deleteBoard = async (id: string) => {
    await API.delete<BoardData>({ path: `/boards/${id}` });
    getBoards();
    toast("board deleted");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "30px auto",
      }}
    >
      <h1>Boards</h1>
      <div className="boardList">
        {boards.map(({ boardName, description, id, ownerId }) => {
          return (
            <div className="board" key={id}>
              <h2>{boardName}</h2>
              <div>{description}</div>
              <Link to={`/boards/${id}`}>View Board</Link>
              {ownerId === user.username && (
                <button onClick={() => deleteBoard(id)}>XX</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBoards;
