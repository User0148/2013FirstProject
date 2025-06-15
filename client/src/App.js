import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Club from "./pages/club/Club";
import Footer from "./components/footer/Footer"
import RegisterClub from "./pages/register_club/RegisterClub";
import {AuthContext} from "./context/authContext";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Events from "./pages/events/Events";




function App() {
  const {currentUser} = useContext(AuthContext);

  // Create a client
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        </QueryClientProvider>
    );
  };

  
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/profile/:id",
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        {
          path: "/club/:id",
          element: <Club />,
        },
        {
          path: "/register_club",
          element: <ProtectedRoute><RegisterClub /></ProtectedRoute>,
        },
        {
          path: "/events",
          element:<Events />
        },

        
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
