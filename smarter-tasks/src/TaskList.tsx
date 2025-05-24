import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
  tasks: TaskItem[];
  deleteTask: (key: number) => void;
}

const TaskList = (props: Props) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          item={task}
          deleteTask={props.deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
