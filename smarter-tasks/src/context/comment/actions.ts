import {
  CommentDetailsPayload,
  CommentDispatch,
  CommentListAvailableAction,
} from "./types";
import { API_ENDPOINT } from "../../config/constants";

export const refreshComments = async (
  dispatch: CommentDispatch,
  projectID: string,
  taskID: string,
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: CommentListAvailableAction.FETCH_COMMENTS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    // extract the response body as JSON data
    const data = await response.json();
    console.log(data);
    dispatch({
      type: CommentListAvailableAction.FETCH_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: CommentListAvailableAction.FETCH_COMMENTS_FAILURE,
      payload: "Unable to load tasks",
    });
  }
};

export const addComment = async (
  dispatch: CommentDispatch,
  projectID: string,
  taskID: string,
  comment: CommentDetailsPayload,
) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: CommentListAvailableAction.CREATE_COMMENTS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create a task");
    }
    dispatch({ type: CommentListAvailableAction.CREATE_COMMENTS_SUCCESS });
    refreshComments(dispatch, projectID, taskID);
  } catch (error) {
    console.log("Operation failed ", error);
    dispatch({
      type: CommentListAvailableAction.CREATE_COMMENTS_FAILURE,
      payload: "Unable to create a task",
    });
  }
};
