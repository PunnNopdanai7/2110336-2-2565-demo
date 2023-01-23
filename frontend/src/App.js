import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Task from "./pages/Task";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/task",
    element: <Task />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
