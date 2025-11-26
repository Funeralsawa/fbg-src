import React, { useState, useEffect, useRef } from 'react';
import InfoDrawer from './infoDrawer';
import { useLocation } from 'react-router-dom';
import site from 'fbg-generated';

const Navbar = () => {
    const [hidden, setHidden] = useState(true);
    const [transparent, setTransparent] = useState(true);
    const [open, setOpen] = useState(false);

    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const homePageRef = useRef(null);
    const searchInputRef = useRef(null);
    const navBarSearchSvgRef = useRef(null);
    const infoDrawerRef = useRef(null);
    
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) setHidden(true);
            else setHidden(false);
            if (currentScrollY <= 0) {
                setTransparent(true);
                if(location.pathname === "/") {
                    homePageRef.current.style.color = "#c9d1d9";
                    navBarSearchSvgRef.current.style.color = "#c9d1d9";
                    infoDrawerRef.current.style.color = "#c9d1d9";
                }
                
            } else {
                setTransparent(false);
                homePageRef.current.style.color = "var(--text)";
                navBarSearchSvgRef.current.style.color = "var(--text)";
                infoDrawerRef.current.style.color = "var(--text)";
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (navRef.current) {
                navRef.current.classList.add("nav-begin");
                if(location.pathname === "/") {
                    homePageRef.current.style.color = "#c9d1d9";
                    navBarSearchSvgRef.current.style.color = "#c9d1d9";
                    infoDrawerRef.current.style.color = "#c9d1d9";
                }
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            homePageRef.current.style.color = "var(--text)";
            navBarSearchSvgRef.current.style.color = "var(--text)";
            infoDrawerRef.current.style.color = "var(--text)";
        };
    }, []);

    const onClick = () => {
        window.location.href = "/";
    };

    const style1 = {
        userSelect: "none",
        cursor: "pointer",
        marginLeft: "1%"
    };

    const handleSearchKeyDown = (e) => {
        if(e.key === 'Enter') {
            const keyword = searchInputRef.current.value.trim();
            if(keyword.length > 0) {
                window.location.href = `/posts/search?keyword=${encodeURIComponent(keyword)}`;
            }
        }
    }

    return (
        <React.Fragment>
            <nav
                className={`navbar navbar-expand-lg ${hidden ? 'nav-hidden' : 'nav-appear'} 
                    ${transparent ? 'nav-transparent' : ''}`}
                ref={navRef}
            >
                <div className="container-fluid" style={{ color: "white" }}>
                    <div onClick={onClick} className='navbar-brand' style={style1}>
                        <img
                            className="nav-icon"
                            src={`/assets/${site.author.avatar}`}
                            alt="icon"
                            draggable="false"
                        />
                        <div className='nav-title'>{site.author.name}'s blog</div>
                    </div>

                    <div className="nav-links">
                        <div className="nav-bar-search">
                            <i className="bi bi-search" ref={navBarSearchSvgRef} />
                            <input type="text" ref={searchInputRef} 
                            className="nav-bar-search-input" 
                            placeholder="标题/作者/年份/概要"
                            onKeyDown={(e) => handleSearchKeyDown(e)}/>
                        </div>
                        <a href="/" ref={homePageRef} >
                            <i className="bi bi-house-door-fill"></i>
                            &nbsp; 首页
                        </a>
                    </div>

                    <div ref={infoDrawerRef} className="drawer-toggle" onClick={() => setOpen(true)}>☰</div>
                </div>

                <div className={`info-drawer ${open ? 'open' : ''}`}>
                    <div className="drawer-content">
                        <InfoDrawer />
                    </div>
                </div>

                <div
                    className={`info-drawer-overray ${open ? 'open' : ''}`}
                    onClick={() => setOpen(false)}
                ></div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
