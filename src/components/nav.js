import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, useSprings, animated } from 'react-spring';

function Navigation() {
    const [activeMenu, setActiveMenu] = useState(true);
    const [clickedMenu, setClickedMenu] = useState(false);
    const links = [
        {name: "Home Page", path: "/"},
        {name: "Create", path: "/create"},
        {name: "Save", path: "/save"}
    ];
    const [hoverMenu, setHoverMenu] = useSpring(() => ({
        backgroundColor: "rgb(255, 255, 255)",
        margin: "20px 0 0 14px",
        padding: "12px 12px",
        boxShadow: "0 0 0px 0 white"
    }));
    const [hoverLine, setHoverLine] = useSprings(3, index => ({
        width: "35px", backgroundColor: "rgb(0, 0, 0)"
    }));
    const [animLinks, setAnimLinks] = useSprings(links.length, index => ({
        display: "none",
        opacity: 0,
        width: "80px",
        marginTop: index===0 ? "100px" : "10px"
    }));
    const hoverMenuHandler = () => {
        setHoverMenu(() => ({
            backgroundColor: "rgb(0, 0, 0)",
            margin: "-16px 0 0 -16px",
            padding: "55px 49px",
            boxShadow: "0 0 4px 0 black"
        }));
        if(activeMenu) {
            setHoverLine(index => ({
                from: {width: "0px", backgroundColor: "rgb(255, 255, 255)"},
                to: [
                    {width: "0px", backgroundColor: "rgb(255, 255, 255)"},
                    {width: "34px", backgroundColor: "rgb(255, 255, 255)"},
                ],
                delay: index * 100,
            }));
        }
        setActiveMenu(false);
    }
    const unhoverMenuHandler = () => {
        document.querySelector("nav").style.pointerEvents = "none";
        setTimeout(() => {
            document.querySelector("nav").style.pointerEvents = "";
        }, 600)
        setHoverMenu(() => ({
            backgroundColor: "rgb(255, 255, 255)",
            margin: "20px 0 0 20px",
            padding: "20px 14px",
            boxShadow: "0 0 0px 0 white"
        }));
        setHoverLine(index => ({
            from: {width: "0px", backgroundColor: "rgb(0, 0, 0)"},
            to: [
                {width: "0px", backgroundColor: "rgb(0, 0, 0)"},
                {width: "34px", backgroundColor: "rgb(0, 0, 0)"},
            ],
            delay: index * 100,
        }));
        setAnimLinks(index => ({
            to: [
                {display: "flex", opacity: 0, marginTop: index===0 ? "120px" : "0px"},
                {display: "none"},
            ]
        }));
        setActiveMenu(true);
        setClickedMenu(false);
    }
    const clickHandler = () => {
        setClickedMenu(!clickedMenu);
        if(clickedMenu) {
            setAnimLinks(index => ({
                to: [
                    {display: "flex", opacity: 0, marginTop: index===0 ? "120px" : "0px"},
                    {display: "none"}
                ]
            }));
        } else {
            setAnimLinks(index => ({
                display: "flex",
                opacity: 1,
                marginTop: index===0 ? "130px" : "10px",
                delay: index * 160
            }));
        }
    }
    return(
        <nav>
            <ul onMouseLeave={unhoverMenuHandler}>
                <animated.li style={hoverMenu} onMouseOver={hoverMenuHandler} onClick={clickHandler}>
                    <animated.div style={hoverLine[2]}></animated.div>
                    <animated.div style={hoverLine[1]}></animated.div>
                    <animated.div style={hoverLine[0]}></animated.div>
                </animated.li>
                {links.map((link, index) => (
                    <animated.li style={animLinks[index]} key={index}>
                        <NavLink exact to={link.path}>{link.name}</NavLink>
                    </animated.li>
                ))}          
            </ul>
        </nav>
    )
}

export default Navigation;