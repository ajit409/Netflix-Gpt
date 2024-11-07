import Login from './Login'; 
import Browse from './Browse';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const Home = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login /> // Reference the component directly, not a string
    },
    {
      path: "/browse",
      element: <Browse /> // Reference the component directly
    }
  ]);


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Home;
