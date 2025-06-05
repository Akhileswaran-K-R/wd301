import React, { Suspense } from "react";
import ProjectDetails from "./ProjectDetails";
import { Outlet } from "react-router-dom";
import { TaskProvider } from "../../context/task/context";
import { CommentProvider } from "../../context/comment/context";
import ErrorBoundary from "../../components/ErrorBoundary";

const ProjectDetailsIndex: React.FC = () => {
  return (
    <>
      <CommentProvider>
        <TaskProvider>
          <ErrorBoundary>
            <Suspense
              fallback={<div className="suspense-loading">Loading...</div>}
            >
              <ProjectDetails />
            </Suspense>
          </ErrorBoundary>
          <Outlet />
        </TaskProvider>
      </CommentProvider>
    </>
  );
};

export default ProjectDetailsIndex;
