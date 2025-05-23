import "./TaskCard.css";

interface TaskProp {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  deleteTask: (key: number) => void;
}

const Task = (props: TaskProp) => {
  return (
    <li className="TaskItem shadow-md border border-slate-100 flex justify-between">
      <div>
        <h2 className="text-base font-bold my-1">{props.title}</h2>
        <p className="text-sm text-slate-500">Due Date: {props.dueDate}</p>
        <p className="text-sm text-slate-500">
          Description: {props.description}
        </p>
      </div>

      <button
        className="deleteTaskButton"
        onClick={() => props.deleteTask(props.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Task;
