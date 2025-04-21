import { NavLink, Outlet } from "react-router-dom";
import './mainMenu.css';

export const MainMenuComponent = () => {
    return (
        <div className="mainmenu">
            <NavLink to="/producer" className={({ isActive }) => isActive ? "active" : ""}>מפיקות</NavLink>
            <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>משתמשים</NavLink>
            <Outlet />
        </div>
    );
};