import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import API from "../utils/API";

const CreateBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async () => {
    console.log({ name, description, isPublic });
    const res = await API.post({
      path: "/boards",
      data: { name, description, isPublic },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
      if ((error as AxiosError).response?.status == 400) {
        const responseData = (error as AxiosError).response?.data as {
          message: string;
        };
        console.log(responseData);
        toast(responseData.message);
      }

    });

    navigate(`/boards/${res.id}`);
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
      <span>Board Name</span>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Board Name"
      />
      <span>Board Description</span>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Board Description"
      />
      <div>
        <span>Make Private</span>
        <input
          type="checkbox"
          checked={!isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
      </div>

      <Button onClick={() => onSubmit()}>Create</Button>
    </div>
  );
};

export default CreateBoard;
