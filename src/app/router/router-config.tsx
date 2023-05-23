import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RootLayout from "../pages/RootLayout";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { AuthContextErrorHandler, AuthProvider } from "../components/contexts/AuthContextErrorHandler";
import AboutPage from "../pages/AboutPage";
import StatisticPage from "../pages/StatisticPage";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="about" element={<AboutPage />}></Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="statistic" element={<StatisticPage />} />
        </Route>
    )
)

const MyRouter = () => {
    return <RouterProvider router={router}></RouterProvider>
};

export default MyRouter;

