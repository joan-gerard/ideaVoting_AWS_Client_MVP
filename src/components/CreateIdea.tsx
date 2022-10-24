import React from "react";
import { Button, Flex } from "@aws-amplify/ui-react";

const CreateIdea: React.FC<CreateIdeaProps> = ({
  ideaName,
  ideaDescription,
  setIdeaName,
  setIdeaDescription,
  isAddingIdea,
  submitIdea,
}) => {
  return (
    <div className="idea-form">
      <div className="idea-form__inputs">
        <div className="">
          <span className="card__title">Idea*</span>
          <input
            type="text"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
            placeholder="What's your idea..."
          />
        </div>
        <div>
          <span className="card__title">Details</span>
          <input
            type="text"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            placeholder="Add details..."
          />
        </div>
      </div>
      <div className="">
        <Button
          onClick={() => submitIdea()}
          variation="primary"
          size="small"
          isLoading={isAddingIdea}
          loadingText="submitting"
          isDisabled={ideaName === "" ? true : false}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateIdea;
