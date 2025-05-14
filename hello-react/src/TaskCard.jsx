import "./TaskCard.css";

const TaskCard = (props)=>{
  return (
    <div className="TaskItem">
      <h2 className="text-xl font-bold mb-3">{props.title}</h2>
      <p className="text-gray-600">
        {props.dueOn 
          ? `Due on: ${props.dueOn}` 
          : `Completed on: ${props.completedOn}`}
      </p >
      <p className="text-gray-600">Assignee: {props.assigneeName}</p>
    </div>

  )
}

export default TaskCard;