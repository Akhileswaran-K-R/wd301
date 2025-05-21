import React from "react"
import Task from "./Task"
import type { TaskItem } from "./types";

interface Props{
  tasks: TaskItem[];
}

interface State{}

class TaskList extends React.Component<Props, State>{
  render(){
    return <>
      {this.props.tasks.map((task,id)=><Task key={id} title={task.title}/>)}
    </>
  }
}

export default TaskList