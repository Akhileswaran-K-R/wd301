import React from "react";
import type { TaskItem } from "./types";

interface TaskFormProps {
  addTask: (task: TaskItem) => void;
}

interface TaskFormState {
  title: string;
  description: string;
  dueDate: string;
}

const TaskForm = (props: TaskFormProps) => {
  const [formState, setFormState] = React.useState<TaskFormState>({
    title: "",
    description: "",
    dueDate: "",
  });

  const titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormState({ ...formState, title: event.target.value });
  };

  const descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setFormState({ ...formState, description: event.target.value });
  };

  const dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setFormState({ ...formState, dueDate: event.target.value });
  };

  const addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (formState.title.length === 0 || formState.dueDate.length === 0) {
      return;
    }
    props.addTask({...formState, id: Date.now() });
    setFormState({title: "", description: "", dueDate: "" });
  };

  return (
    <>
      <form onSubmit={addTask} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="todoTitle" className="font-medium">
            Title
          </label>
          <input
            type="text"
            id="todoTitle"
            className="border border-black p-2 rounded"
            value={formState.title}
            onChange={titleChanged}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="todoDescription" className="font-medium">
            Description
          </label>
          <input
            type="text"
            id="todoDescription"
            className="border border-black p-2 rounded"
            value={formState.description}
            onChange={descriptionChanged}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="todoDueDate" className="font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="todoDueDate"
            className="border border-black p-2 rounded"
            value={formState.dueDate}
            onChange={dueDateChanged}
            required
          />
        </div>

        <button
          type="submit"
          id="addTaskButton"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >
          Add item
        </button>
      </form>
    </>
  );
};

export default TaskForm;
