import React from "react";
import type { TaskItem } from "./types";

interface TaskFormProps{
  addTask: (task: TaskItem) => void;
};

interface TaskFormState{
  title: string;
};

class TaskForm extends React.Component<TaskFormProps,TaskFormState>{

  constructor(props: TaskFormProps){
    super(props);
    this.state = {
      title: ""
    }
  }

  addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newTask = {
      title: this.state.title,
    };
    this.props.addTask(newTask);
    this.setState({ title: "" });
  };

  titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ title: event.target.value });
  };

  render(){
    return(
      <form onSubmit={this.addTask}>
        <input type="text" className="border border-black p-1" value={this.state.title} onChange={this.titleChanged}/>
        <button className="ml-2 bg-green-500 rounded p-1" type="submit">Add item</button>
      </form>
    )
  }
}

export default TaskForm;