import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
    div: {
        display: "flex",
        width: "100%",
        height: "80px",
        justifyContent: "space-around",
        alignItems: "center"
    }
}

function Progress() {
    return(
        <div style={styles.div}>
            <NavLink exact to="/">
                Sprzedawca
            </NavLink>
            <NavLink exact to="/part2">
                Nabywca
            </NavLink>
            <NavLink exact to="/part3">
                Dane do faktury
            </NavLink>
        </div>
    )
}

export default Progress;