import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { AxiosError } from "axios";
import { MdOutlineHowToVote } from "react-icons/md";
import { Button, Flex } from "@aws-amplify/ui-react";

import API from "../utils/API";
import "./style/ViewBoard.scss";
import CreateIdea from "../components/CreateIdea";

const ViewBoard = () => {
  const params = useParams(); // inside your component
  const boardId = params.id;

  const [boardData, setBoardData] = useState<BoardData>();
  const [date, setDate] = useState("");
  const [showCreateIdea, setShowCreateIdea] = useState(false);
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  // const [isVoting, setIsVoting] = useState(false);
  const [isAddingIdea, setIsAddingIdea] = useState(false);

  const navigate = useNavigate();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardData]);

  const submitIdea = async () => {
    setIsAddingIdea(true);
    await API.post({
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
    setIsAddingIdea(false);
  };

  const voteOnIdea = async (id: string) => {
    // setIsVoting(true);
    await API.post({
      path: `/ideas/${id}`,
      data: {},
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
      if ((error as AxiosError).response?.status === 400) {
        const responseData = (error as AxiosError).response?.data as {
          message: string;
        };
        toast(responseData.message, {
          transition: Flip,
        });
      }
    });
    getBoard();
    // setIsVoting(false);
  };

  return (
    <div className="view">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Flex direction="column" className="board__info">
          <p>Created: {date}</p>
          <p>{boardData?.id}</p>
        </Flex>

        <Button onClick={() => navigate("/boards")}>Boards</Button>
      </Flex>
      <p className="board__title">{boardData?.boardName}</p>

      <div className="board">
        <div className="board board__desc">
          <p>{boardData?.description}</p>
        </div>
        <div className="">
          {boardData?.ideas.map(({ ideaTitle, description, votes, id }) => (
            <div key={id} className="idea-card">
              <div className="vote__wrapper">
                <p>{votes}</p>
              </div>
              <div className="idea-info">
                <p className="card__title">{ideaTitle}</p>
                <p>{description}</p>
              </div>
              <div className="cta__wrapper">
                <Button
                  onClick={() => voteOnIdea(id)}
                  // isLoading={isVoting}
                  loadingText="voting"
                >
                  <MdOutlineHowToVote />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="add-idea__wrapper">
        <Button
          variation="primary"
          size="small"
          loadingText="loading"
          ariaLabel=""
          onClick={() => setShowCreateIdea(!showCreateIdea)}
        >
          {showCreateIdea ? "Hide" : "Add Idea"}
        </Button>
      </div>

      {showCreateIdea ? (
        <CreateIdea
          ideaName={ideaName}
          ideaDescription={ideaDescription}
          setIdeaName={setIdeaName}
          setIdeaDescription={setIdeaDescription}
          isAddingIdea={isAddingIdea}
          submitIdea={submitIdea}
        />
      ) : null}
    </div>
  );
};

export default ViewBoard;
