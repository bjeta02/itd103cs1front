

import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import AddUser from "views/AddUser.js";
import Attendance from "views/Attendance.js";
import Record from "views/Records.js"

var routes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-bar-32",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Employee",
    icon: "tim-icons icon-badge",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/user-profile/:id",
    name: "Edit Info",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/adduser",
    name: "Add Employee",
    icon: "tim-icons icon-simple-add",
    component: <AddUser />,
    layout: "/admin",
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "tim-icons icon-calendar-60",
    component: <Attendance />,
    layout: "/admin",
  },
  {
    path: "/record",
    name: "Record",
    icon: "tim-icons icon-single-copy-04",
    component: <Record />,
    layout: "/admin",
  },
];
export default routes;
