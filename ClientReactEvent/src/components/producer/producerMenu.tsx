import { NavLink, Outlet } from "react-router-dom";

export const ProducerMenuComponent = () => {
    return (
        <div>
            <NavLink to="addProducer">מפיקה חדשה</NavLink><br />
            <NavLink to="checkProducer">מפיקה קיימת</NavLink>
            <Outlet /> 
        </div>
    );
};
