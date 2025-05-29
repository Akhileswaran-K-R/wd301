interface Project {
  id: number;
  name: string;
}

export const initialState: ProjectsState = {
  projects: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type ProjectsActions =
  | { type: "FETCH_PROJECT_REQUEST" }
  | { type: "FETCH_PROJECT_SUCCESS"; payload: Project[] }
  | { type: "FETCH_PROJECT_FAILURE"; payload: string }
  | { type: "ADD_PROJECT_SUCCESS"; payload: Project };

export const reducer = (
  state: ProjectsState = initialState,
  action: ProjectsActions,
): ProjectsState => {
  switch (action.type) {
    case "FETCH_PROJECT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PROJECT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };
    case "FETCH_PROJECT_FAILURE":
      return {
        ...state,
        isLoading: true,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_PROJECT_SUCCESS":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};
