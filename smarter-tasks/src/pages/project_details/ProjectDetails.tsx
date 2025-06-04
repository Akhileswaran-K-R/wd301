import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";
import { useTasksState, useTasksDispatch } from "../../context/task/context";
import { refreshTasks } from "../../context/task/actions";
import DragDropList from "./DragDropList";

const ProjectDetails = () => {
  const taskState = useTasksState();
  const taskDispatch = useTasksDispatch();
  const projectState = useProjectsState();
  const { projectID } = useParams();

  useEffect(() => {
    if (projectID) refreshTasks(taskDispatch, projectID);
  }, [projectID, taskDispatch]);

  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID,
  )?.[0];

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  if (taskState.isLoading) {
    return <>Loading..</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject.name}
        </h2>
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus-visible:ring-2 focus-visible:ring-opacity-75"
          >
            New Task
          </button>
        </Link>
      </div>
      <div>
        <DragDropList data={taskState.projectData} />
      </div>
    </>
  );
};

export default ProjectDetails;
