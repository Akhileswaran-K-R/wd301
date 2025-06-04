import React from "react";
import ProjectDetails from "./ProjectDetails";
import { Outlet } from "react-router-dom";
import { TaskProvider } from "../../context/task/context";
import { CommentProvider } from "../../context/comment/context";

const ProjectDetailsIndex: React.FC = () => {
  return (
    <>
      <CommentProvider>
        <TaskProvider>
          <ProjectDetails />
          <Outlet />
        </TaskProvider>
      </CommentProvider>
    </>
  );
};

export default ProjectDetailsIndex;
