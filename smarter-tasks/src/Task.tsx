import "./TaskCard.css";
import type { TaskItem } from "./types";

interface TaskProp {
  item: TaskItem;
  deleteTask: (key: number) => void;
}

const Task = (props: TaskProp) => {
  const {item,deleteTask} = props;
  return (
    <li className="TaskItem shadow-md border border-slate-100 flex justify-between">
      <div>
        <a href={`/tasks/${item.id}`}>
          <h2 className="text-base font-bold my-1">{item.title}</h2>
        </a>
        <p className="text-sm text-slate-500">Due Date: {item.dueDate}</p>
        <p className="text-sm text-slate-500">
          Description: {item.description}
        </p>
      </div>

      <button
        className="deleteTaskButton"
        onClick={() => deleteTask(item.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Task;
