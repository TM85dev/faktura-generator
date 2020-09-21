import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Progress() {
    const progress = useSelector(state => state.progress);
    return(
        <div className="progress">
            <NavLink exact to="/" className={progress.p1 ? "" : "disabled-link"}>
                Sprzedawca
            </NavLink>
            <NavLink exact to="/part2" className={progress.p2 ? "" : "disabled-link"}>
                Nabywca
            </NavLink>
            <NavLink exact to="/part3" className={progress.p3 ? "" : "disabled-link"}>
                Dane do faktury
            </NavLink>
        </div>
    )
}

export default Progress;