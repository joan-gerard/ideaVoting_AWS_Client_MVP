import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { AxiosError } from "axios";

import API from "../utils/API";
import './style/CreateBoard.scss'

const CreateBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isCreatingBoard, setisCreatingBoard] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (name) setisCreatingBoard(true);

    const res = await API.post({
      path: "/boards",
      data: { name, description, isPublic },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
      if ((error as AxiosError).response?.status === 400) {
        const responseData = (error as AxiosError).response?.data as {
          message: string;
        };
        console.log(responseData);
        toast(responseData.message, {
          transition: Flip,
        });
      }
    });

    navigate(`/boards/${res.id}`);
  };

  return (
    <div className="view">
      <div className="create-board__form">
        <div className="inputs__wrapper">
          <div>
            <span>Name*</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Board Name"
            />
          </div>
          <div>
            <span>Description</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Board Description"
            />
          </div>
        </div>
        <div>
          <span>Make Private</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={!isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </div>
        <div className="create-board__wrapper">
          <Button
            onClick={() => onSubmit()}
            size="small"
            variation="primary"
            isLoading={isCreatingBoard}
            loadingText="creating"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
