import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  let navigate = useNavigate();
  const location = useLocation();

  const iconBgHandler = (input) => {
    var locations = location.pathname.split("/");
    if (locations[1] === input) return "#020241";
    return "white";
  };

  const changeRoute = (path) => {
    navigate(path);
  };

  const iconStyle = {
    color: "rgb(69,112,130)",
    width: "60%",
    height: "auto",
  };

  return (
    <div className="Element" onClick={() => changeRoute(item.route)}>
      <div
        className="Icon"
        style={{ backgroundColor: iconBgHandler(item.location) }}
      >
        <item.icon sx={iconStyle}></item.icon>
      </div>
      <div className="Title">{item.title}</div>
    </div>
  );
};

export default SidebarItem;
