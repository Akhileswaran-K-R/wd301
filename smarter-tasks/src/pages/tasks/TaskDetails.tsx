import { Dialog, Transition, Listbox } from "@headlessui/react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask } from "../../context/task/actions";

import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";
import { useMembersState } from "../../context/members/context";

import { CommentListState } from "../../context/comment/types";
import {
  useCommentsDispatch,
  useCommentsState,
} from "../../context/comment/context";
import { addComment, refreshComments } from "../../context/comment/actions";

type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
};

// Helper function to format the date to YYYY-MM-DD format
const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Format the date as per the required format for the date picker (YYYY-MM-DD)
  return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { projectID, taskID } = useParams();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData") ?? "");

  // Extract project and task details.
  const projectState = useProjectsState();
  const memberState = useMembersState();
  const taskListState = useTasksState();
  const taskDispatch = useTasksDispatch();
  const commentListState = useCommentsState();
  const commentDispatch = useCommentsDispatch();

  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID,
  )[0];

  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];

  const [selectedPerson, setSelectedPerson] = useState(
    selectedTask.assignedUserName ?? "",
  );

  useEffect(() => {
    if (projectID && taskID)
      refreshComments(commentDispatch, projectID, taskID);
  }, [projectID, taskID, commentDispatch]);

  // Use react-form-hook to manage the form. Initialize with data from selectedTask.
  const { register, handleSubmit } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask.title,
      description: selectedTask.description,
      selectedPerson: selectedTask.assignedUserName,
      dueDate: formatDateForPicker(selectedTask.dueDate),
    },
  });

  const [comment, setComment] = useState("");

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
    if (!isOpen) {
      return;
    }
    const assignee = memberState?.members?.filter(
      (member) => member.name === selectedPerson,
    )?.[0];

    updateTask(taskDispatch, projectID ?? "", {
      ...selectedTask,
      ...data,
      assignee: assignee?.id,
    });
    closeModal();
  };

  const Comment = (props: { commentState: CommentListState }) => {
    const { commentState } = props;
    if (commentState.isLoading) {
      return <>Loading!</>;
    }

    if (commentState.isError) {
      return <>{commentState.errorMessage}</>;
    }

    return (
      <div className="mt-2">
        <h3>
          <strong>Comments:</strong>
        </h3>
        {commentState.comments
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((comment) => {
            const author = memberState?.members?.find(
              (member) => member.id === comment.owner,
            );
            return (
              <div key={comment.id} className="comment m-2 text-gray-700">
                {author?.name}: {comment.description} (
                {formatDateForPicker(comment.createdAt)})
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Task Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        id="title"
                        {...register("title", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        id="description"
                        {...register("description", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        id="dueDate"
                        {...register("dueDate", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <h3>
                        <strong>Assignee</strong>
                      </h3>
                      <Listbox
                        value={selectedPerson}
                        onChange={setSelectedPerson}
                      >
                        <Listbox.Button className="w-full border rounded-md py-2 px-3 my-2 text-gray-700 text-base text-left">
                          {selectedPerson}
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {memberState?.members.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-100 text-blue-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={person.name}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>

                      <Comment commentState={commentListState} />

                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          placeholder="Enter comments"
                          id="commentBox"
                          name="commentBox"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                        />
                        <button
                          type="button"
                          className="rounded-md bg-blue-600 h-10 w-36 m-2 p-2 text-sm font-medium text-white hover:bg-opacity-95 focus-visible:ring-2 focus-visible:ring-opacity-75"
                          id="addCommentBtn"
                          onClick={() => {
                            if (comment === "") return;
                            addComment(
                              commentDispatch,
                              projectID ?? "",
                              taskID ?? "",
                              { description: comment, owner: userData.id },
                            );
                            setComment("");
                          }}
                        >
                          Add
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>
                      <button
                        type="submit"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TaskDetails;
