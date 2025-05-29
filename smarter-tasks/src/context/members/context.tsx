/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { MembersAction, MembersState, initialState, reducer } from "./reducer";

type MembersDispatch = React.Dispatch<MembersAction>;

const MembersStateContext = createContext<MembersState | undefined>(undefined);

const MembersDispatchContext = createContext<MembersDispatch | undefined>(
  undefined,
);

export const MembersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MembersStateContext.Provider value={state}>
      <MembersDispatchContext.Provider value={dispatch}>
        {children}
      </MembersDispatchContext.Provider>
    </MembersStateContext.Provider>
  );
};

export const useMembersState = () => useContext(MembersStateContext);

export const useMembersDispatch = () => useContext(MembersDispatchContext);
