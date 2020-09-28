import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Progress() {
    const progress = useSelector(state => state.progress);
    return(
        <div className="progress">
            <NavLink exact to="/" >
                Sprzedawca
            </NavLink>
            <hr style={{opacity: progress.p1 ? 1 : 0}} />
            <NavLink exact to="/part2" className={progress.p1 ? "" : "disabled-link"}>
                Nabywca
            </NavLink>
            <hr style={{opacity: progress.p2 ? 1 : 0}} />
            <NavLink exact to="/part3" className={progress.p2 ? "" : "disabled-link"}>
                Dane do faktury
            </NavLink>
        </div>
    )
}

export default Progress;