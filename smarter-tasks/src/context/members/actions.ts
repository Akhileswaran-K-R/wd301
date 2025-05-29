/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const addMembers = async (dispatch: any, args: any) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      throw new Error("Failed to create a member");
    }

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return { ok: false, error: data.errors[0].message };
    }

    dispatch({ type: "ADD_MEMBER_SUCCESS", payload: data.user });
    return { ok: true };
  } catch (error) {
    console.error("Operation failed: ", error);
    return { ok: false, error };
  }
};

export const deleteMember = async (dispatch: any, id: number) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the member");
    }

    dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: id });
  } catch (error) {
    console.error("Operation failed: ", error);
  }
};

export const fetchMembers = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    dispatch({ type: "FETCH_MEMBER_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "FETCH_MEMBER_FAILURE",
      payload: "Unable to load members",
    });
  }
};
