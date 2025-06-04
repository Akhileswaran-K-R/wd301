import { Reducer } from "react";
import {
  CommentListAvailableAction,
  CommentListState,
  CommentActions,
} from "./types";

export const initialState: CommentListState = {
  comments: [
    {
      id: 0,
      description: "",
      task_id: 0,
      owner: 0,
      createdAt: "",
    },
  ],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const commentReducer: Reducer<CommentListState, CommentActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CommentListAvailableAction.FETCH_COMMENTS_REQUEST:
      return { ...state, isLoading: true };
    case CommentListAvailableAction.FETCH_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comments: action.payload };
    case CommentListAvailableAction.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case CommentListAvailableAction.CREATE_COMMENTS_REQUEST:
      return { ...state, isLoading: true };
    case CommentListAvailableAction.CREATE_COMMENTS_SUCCESS:
      return { ...state, isLoading: false };
    case CommentListAvailableAction.CREATE_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
