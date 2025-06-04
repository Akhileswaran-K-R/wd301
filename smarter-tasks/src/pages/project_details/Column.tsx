import React, { forwardRef } from "react";
import { ColumnData, TaskDetails } from "../../context/task/types";
import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";

const Container = (props: React.PropsWithChildren) => {
  return (
    <div className="m-2 border border-gray rounded w-1/3 flex flex-col">
      {props.children}
    </div>
  );
};

const Title = (props: React.PropsWithChildren) => {
  return <h3 className="p-2 font-semibold">{props.children}</h3>;
};

const TaskList = forwardRef<HTMLDivElement | null, React.PropsWithChildren>(
  (props: React.PropsWithChildren, ref) => {
    return (
      <div ref={ref} className="grow min-h-100 dropArea" {...props}>
        {" "}
        {props.children}
      </div>
    );
  },
);

interface Props {
  column: ColumnData;
  tasks: TaskDetails[];
}

const Column: React.FC<Props> = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task, idx) => (
              <Task key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
