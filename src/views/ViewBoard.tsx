import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { AxiosError } from "axios";

import API from "../utils/API";

const ViewBoard = () => {
  const params = useParams(); // inside your component
  const boardId = params.id;

  const [boardData, setBoardData] = useState<BoardData>();
  const [date, setDate] = useState("");
  const [showCreateIdea, setShowCreateIdea] = useState(false);
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");

  const getBoard = async () => {
    const res = await API.get<BoardData>({ path: `/boards/${boardId}` });
    setBoardData(res);
  };

  const getDate = () => {
    const ms = boardData?.date;

    if (ms) {
      const date = new Date(ms);
      setDate(date.toDateString());
    }
  };

  useEffect(() => {
    getBoard();
  }, []);
  useEffect(() => {
    getDate();
  }, [boardData]);

  const submitIdea = async () => {
    const res = await API.post({
      path: "/ideas",
      data: { title: ideaName, description: ideaDescription, boardId },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
    setShowCreateIdea(false);
    setIdeaName("");
    setIdeaDescription("");
    getBoard();
  };

  const voteOnIdea = async (id: string) => {
    const res = await API.post({
      path: `/ideas/${id}`,
      data: {},
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
      if ((error as AxiosError).response?.status == 400) {
        const responseData = (error as AxiosError).response?.data as {
          message: string;
        };
        console.log(responseData);
        toast(responseData.message, {
          transition: Flip,
        });
      }
    });
    getBoard();
  };

  return (
    <div>
      <p>{boardData?.boardName}</p>
      <p>{boardData?.description}</p>
      <span>Created - {date}</span>
      <div>
        {boardData?.ideas.map((idea) => (
          <div key={idea.id}>
            <h3>{idea.ideaTitle}</h3>
            <p>{idea.description}</p>
            <p>Votes = {idea.votes}</p>
            <button onClick={() => voteOnIdea(idea.id)}>Vote</button>
          </div>
        ))}
      </div>

      <button
        className="showCreateIdea"
        onClick={() => setShowCreateIdea(!showCreateIdea)}
      >
        {showCreateIdea ? 'Hide "Create Idea"' : "Create an idea"}
      </button>

      {showCreateIdea ? (
        <div>
          <h2>Create an Idea</h2>
          <span>Idea Name</span>
          <input
            type="text"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
            placeholder="Board Name"
          />
          <span>Description</span>
          <input
            type="text"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            placeholder="Board Description"
          />
          <button onClick={() => submitIdea()}>Submit Idea</button>
        </div>
      ) : null}
    </div>
  );
};

export default ViewBoard;
