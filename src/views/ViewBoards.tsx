import { Button } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../utils/API";

const ViewBoards = () => {
  const [boards, setBoards] = useState<BoardListData[]>([]);


  const getBoards = async () => {
    const res = await API.get<BoardListData[]>({ path: "/boards" });
    setBoards(res);
  };

  useEffect(() => {
    getBoards();
  }, []);

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
        {boards.map(({ boardName, description, id }) => {
          return (
            <div className="board" key={id}>
              <h2>{boardName}</h2>
              <div>{description}</div>
              <Link to={`/boards/${id}`}>View Board</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBoards;
