import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
  tasks: TaskItem[];
  deleteTask: (key: number) => void;
}

const TaskList = (props: Props) => {
  return (
    <ul>
      {props.tasks.map((task, id) => (
        <Task
          key={id}
          id={id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          deleteTask={props.deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
