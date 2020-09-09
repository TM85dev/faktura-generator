import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
    nav: {
        width: "100%",
        height: "40px",
        boxShadow: "0 1px 1px 0 gray"
    },
    ul: {
        margin: "10px 0px",
        padding: "0px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    li: {
        display: "block",
        padding: "3px 20px",
        boxShadow: "0 0 2px 0 black"
    },
    a: {
        textDecoration: "none",
        color: "black"
    },
    first: {
        display: "block",
        fontSize: "1.4em",
        fontWeight: "bold"
    }
}

function Navigation() {
    const links = [
        {name: "Home Page", path: "/"},
        {name: "Create", path: "/create"},
        {name: "Save", path: "/save"}
    ];
    return(
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.first}>Faktura PDF</li>
                {links.map((link, index) => (
                    <li style={styles.li} key={index}>
                        <NavLink style={styles.a} exact to={link.path}>{link.name}</NavLink>
                    </li>
                ))}          
            </ul>
        </nav>
    )
}

export default Navigation;