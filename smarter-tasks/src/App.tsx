import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import TaskListPage from "./pages/TaskListPage";
// import Layout from "./Layout";
// import TaskDetailsPage from "./pages/TaskDetailsPage";
// import Signin from "./pages/Signin";
// import ProtectedRoute from "./ProtectedRoute";
import Notfound from "./pages/Notfound";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signup" replace />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/notfound",
    element: <Notfound />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
