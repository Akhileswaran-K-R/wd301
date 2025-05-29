/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteMember } from "../../context/members/actions";
import {
  useMembersState,
  useMembersDispatch,
} from "../../context/members/context";

export default function MemberListItems() {
  const state: any = useMembersState();
  const dispatchMembers = useMembersDispatch();

  const { members, isLoading, isError, errorMessage } = state;

  if (members.length === 0 && isLoading) {
    return <span>Loading....</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {members.map((member: any) => (
        <div
          key={member.id}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 member mt-3 flex justify-between items-center"
        >
          <div>
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              {member.name}
            </h5>
            <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              {member.email}
            </h5>
          </div>
          <button
            className="rounded-md bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={() => {
              deleteMember(dispatchMembers, member.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
