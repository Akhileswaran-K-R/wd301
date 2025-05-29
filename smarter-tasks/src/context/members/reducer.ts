interface Member {
  id: number;
  name: string;
  email: string;
}

export interface MembersState {
  members: Member[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type MembersAction =
  | { type: "FETCH_MEMBER_REQUEST" }
  | { type: "FETCH_MEMBER_SUCCESS"; payload: Member[] }
  | { type: "FETCH_MEMBER_FAILURE"; payload: string }
  | { type: "ADD_MEMBER_SUCCESS"; payload: Member }
  | { type: "DELETE_MEMBER_SUCCESS"; payload: number };

export const initialState: MembersState = {
  members: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const reducer = (
  state: MembersState,
  action: MembersAction,
): MembersState => {
  switch (action.type) {
    case "FETCH_MEMBER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MEMBER_SUCCESS":
      return {
        ...state,
        members: action.payload,
        isLoading: false,
      };
    case "FETCH_MEMBER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_MEMBER_SUCCESS":
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case "DELETE_MEMBER_SUCCESS":
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
      };
    default:
      return state;
  }
};
