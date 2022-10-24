interface Idea {
  date: number;
  description?: string;
  id: string;
  ideaTitle: string;
  votes: number;
}

interface BoardData extends BoardListData {
  ideas: Idea[];
}

interface BoardListData {
  boardName: string;
  description?: string;
  date: number;
  id: string;
  owner: string;
  public: true;
  ownerId: string;
}

type ViewBoardsProps = {
  user: AmplifyUser;
};

type CreateIdeaProps = {
  ideaName: string;
  ideaDescription: string;
  setIdeaName: (a: string) => void;
  setIdeaDescription: (a: string) => void;
  isAddingIdea: boolean;
  submitIdea: () => void;
};
