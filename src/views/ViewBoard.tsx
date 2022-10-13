import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";

const ViewBoard = () => {
  const params = useParams(); // inside your component
  const boardId = params.id;

  const [boardData, setBoardData] = useState<BoardData>();

  console.log({ boardId });

  const getBoard = async () => {
    const res = await API.get<BoardData>({ path: `/boards/${boardId}` });
    console.log("get board response", res);
    setBoardData(res);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      <p>{boardData?.boardName}</p>
      <p>{boardData?.description}</p>
      <div>
        {boardData?.ideas.map((idea) => (
          <div>
            <h3>{idea.ideaTitle}</h3>
            <p>{idea.description}</p>
            <p>Votes = {idea.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBoard;
