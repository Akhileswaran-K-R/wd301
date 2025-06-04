export type CommentDetails = {
  id: number;
  description: string;
  task_id: number;
  owner: number;
  createdAt: string;
};

export type CommentDetailsPayload = Omit<
  CommentDetails,
  "id" | "task_id" | "createdAt"
>;

export enum CommentListAvailableAction {
  FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST",
  FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS",
  FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE",

  CREATE_COMMENTS_REQUEST = "CREATE_COMMENTS_REQUEST",
  CREATE_COMMENTS_SUCCESS = "CREATE_COMMENTS_SUCCESS",
  CREATE_COMMENTS_FAILURE = "CREATE_COMMENTS_FAILURE",
}

export interface CommentListState {
  comments: CommentDetails[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type CommentActions =
  | { type: CommentListAvailableAction.FETCH_COMMENTS_REQUEST }
  | {
      type: CommentListAvailableAction.FETCH_COMMENTS_SUCCESS;
      payload: CommentDetails[];
    }
  | { type: CommentListAvailableAction.FETCH_COMMENTS_FAILURE; payload: string }
  | { type: CommentListAvailableAction.CREATE_COMMENTS_REQUEST }
  | { type: CommentListAvailableAction.CREATE_COMMENTS_SUCCESS }
  | {
      type: CommentListAvailableAction.CREATE_COMMENTS_FAILURE;
      payload: string;
    };

export type CommentDispatch = React.Dispatch<CommentActions>;
