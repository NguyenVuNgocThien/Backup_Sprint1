import { useRoutes } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import Home from "pages/Home";
import ManageUser from "pages/ManageUser/index";
import CreateUser from "pages/ManageUser/CreateUser";
import ManageAsset from "pages/ManageAsset";
import ManageAssignment from "pages/ManageAssignment";
import RequestForReturning from "pages/RequestForReturning";
import Report from "pages/Report";
import EditUser from "pages/ManageUser/EditUser";
import { useContext } from "react";
import { UserRoleContext } from "context/UserRoleContext";
import NotFound from "pages/NotFound";

const Router = () => {
    const userRole = useContext(UserRoleContext);

    return useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "manage-user",
                    element: userRole === "admin" ? <ManageUser /> : <NotFound />,
                },
                {
                    path: "manage-user/edit-user",
                    element: userRole === "admin" ? <EditUser /> : <NotFound />,
                },
                {
                    path: "manage-user/create-new-user",
                    element: userRole === "admin" ? <CreateUser /> : <NotFound />,
                },
                {
                    path: "manage-asset",
                    element: userRole === "admin" ? <ManageAsset /> : <NotFound />,
                },
                {
                    path: "manage-assignment",
                    element: userRole === "admin" ? <ManageAssignment /> : <NotFound />,
                },
                {
                    path: "request-for-returning",
                    element:
                        userRole === "admin" ? <RequestForReturning /> : <NotFound />,
                },
                {
                    path: "report",
                    element: userRole === "admin" ? <Report /> : <NotFound />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ]);
};

export default Router;
