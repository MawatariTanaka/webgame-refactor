import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import { auth } from "../contexts/FirebaseContext";
import logoIcon from "../images/logo.jpg";

const Menus = [
    {
        title: "Home",
        url: "/",
        style: "",
        icon: "",
    },
    // {
    //     title: "About",
    //     url: "/About",
    //     style: "",
    //     icon: "",
    // },
    {
        title: "Login",
        url: "/Login",
        style: "",
        icon: "",
    },
    {
        title: "Register",
        url: "/Register",
        style: "",
        icon: "",
    },
    {
        title: "Logout",
        url: "/Logout",
        style: "",
        icon: "",
    },
];

const Header = () => {
    const filteredMenus = auth.currentUser
        ? Menus.filter((e) => e.title !== "Login" && e.title !== "Register")
        : Menus.filter((e) => e.title !== "Logout");

    return (
        <div className="nav-bar">
            <div className="nav">
                <img style={{ width: "64px" }} src={logoIcon} />
                <h1>Web Game</h1>
            </div>

            <div className="nav">
                {filteredMenus.map((e) => (
                    <NavLink key={e.title} className="nav-link" to={e.url}>
                        {e.title}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Header;
