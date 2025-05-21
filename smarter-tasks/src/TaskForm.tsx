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

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      dueDate: "",
    };
  }

  addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newTask = {
      title: this.state.title,
      description: this.state.description,
      dueDate: this.state.dueDate
    };
    this.props.addTask(newTask);

    this.setState({ 
      title: "",
      description: "",
      dueDate: "",
    });
  };

  titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ title: event.target.value });
  };

  descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ description: event.target.value });
  };

  dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ dueDate: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.addTask} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="todoTitle" className="font-medium">Title</label>
          <input
            type="text"
            id="todoTitle"
            className="border border-black p-2 rounded"
            value={this.state.title}
            onChange={this.titleChanged}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="todoDescription" className="font-medium">Description</label>
          <input
            type="text"
            id="todoDescription"
            className="border border-black p-2 rounded"
            value={this.state.description}
            onChange={this.descriptionChanged}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="todoDueDate" className="font-medium">Due Date</label>
          <input
            type="date"
            id="todoDueDate"
            className="border border-black p-2 rounded"
            value={this.state.dueDate}
            onChange={this.dueDateChanged}
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

    );
  }
}

export default TaskForm;
