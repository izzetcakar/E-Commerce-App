import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//CSS
import "../styles/app.scss";
//ICONS
import logo from "../styles/logo.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import AuthContext from "../context/authContext";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const items = [
    {
      icon: HomeRoundedIcon,
      title: "HOME",
      route: "/",
      location: "",
    },
    {
      icon: CreateIcon,
      title: "CART",
      route: "/cart",
      location: "cart",
    },
    {
      icon: PersonIcon,
      title: "PROFILE",
      route: "/profile",
      location: "profile",
    },
    {
      icon: ViewListIcon,
      title: "ORDERS",
      route: "/orders",
      location: "orders",
    },
    {
      icon: AddIcon,
      title: "CREATE",
      route: "/createProduct",
      location: "createProduct",
    },
  ];

  return (
    <div className="SidebarContainer">
      <img alt="..." src={logo} className="Logo"></img>
      <div className="Elements">
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
      <div className="Logout" onClick={logout}>
        <LogoutIcon
          sx={{
            color: "#1f343d",
            width: "30%",
            height: "auto",
          }}
        />
        <div className="Exit">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
