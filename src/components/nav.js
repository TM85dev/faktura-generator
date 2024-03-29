import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, useSprings, animated } from 'react-spring';
import { useSelector } from 'react-redux';

function Navigation() {
    const [activeMenu, setActiveMenu] = useState(true);
    const [clickedMenu, setClickedMenu] = useState(false);
    const progress = useSelector(state => state.progress);
    const links = [
        {name: "Home Page", path: "/faktura/", active: true},
        {name: "Sprzedawca", path: "/faktura/", active: true},
        {name: "Nabywca", path: "/faktura/part2", active: progress.p1 ? true : false},
        {name: "Dane", path: "/faktura/part3", active: progress.p2 ? true : false},
        {name: "Faktura", path: "/faktura/pdf", active: progress.p3 ? true : false}
    ];
    const [hoverMenu, setHoverMenu] = useSpring(() => ({
        backgroundColor: "rgba(245, 245, 245, 0)",
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
        width: "84px",
        marginTop: index===0 ? "100px" : "10px"
    }));
    const hoverMenuHandler = () => {
        setHoverMenu(() => ({
            backgroundColor: "rgba(0, 0, 0, 1)",
            margin: "-16px 0 0 -16px",
            padding: "55px 49px",
            boxShadow: "0 0 4px 0 black"
        }));
        if(activeMenu) {
            setHoverLine(index => ({
                from: {width: "0px", backgroundColor: "rgb(245, 245, 245)"},
                to: [
                    {width: "0px", backgroundColor: "rgb(245, 245, 245)"},
                    {width: "34px", backgroundColor: "rgb(245, 245, 245)"},
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
            backgroundColor: "rgba(245, 245, 245, 0)",
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
                    link.active ?
                    <animated.li style={animLinks[index]} key={index}>
                        <NavLink exact to={link.path}>{link.name}</NavLink>
                    </animated.li> :
                    null
                ))}          
            </ul>
        </nav>
    )
}

export default Navigation;