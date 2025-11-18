import React, { useEffect } from 'react';
import BlogToc from './blogToc';

function AsideNavbar() {
    const [display, setDisplay] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if(currentScrollY <= 0) {
            setDisplay(false);
            setOpen(false);
        } else {
            setDisplay(true);
        }
    }

    const changeTheme = () => {
        localStorage.getItem('theme') === 'dark' ?
        (document.documentElement.classList.remove('dark'),
         localStorage.setItem('theme', 'light')) :
        (document.documentElement.classList.add('dark'),
         localStorage.setItem('theme', 'dark'));
        setTheme(localStorage.getItem('theme'));
    }

    useEffect(() => {
        localStorage.getItem('theme') === 'dark' ?
        document.documentElement.classList.add('dark') :
        document.documentElement.classList.remove('light');

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <React.Fragment>
            <div className={`aside-navbar-toggle aside-navbar-theme aside-navbar-display`}
                onClick={() => {changeTheme();}}>
                {theme === 'dark' ?
                <i className={"bi bi-moon"} /> :
                <i className={"bi bi-brightness-high"} />}
            </div>
            <div className={`aside-navbar-toggle aside-navbar-toc aside-navbar-display`}
                onClick={() => {setOpen(!open);}}
            >
                <i className="bi bi-list-ul"></i>
            </div>
            <div className={`aside-navbar-toggle aside-navbar-arrow ${display ? 'aside-navbar-display' : ""}`}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
                <i className="bi bi-arrow-up"></i>
            </div>
            <div className={`aside-navbar-drawer-overray ${open ? 'aside-navbar-drawer-overray-display' : ''}`} onClick={() => setOpen(!open)}></div>
            <div className={`aside-navbar-drawer ${open ? 'aside-navbar-drawer-open' : ''}`}>
                <div className="aside-navbar-drawer-content">
                    <BlogToc theme={theme} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default AsideNavbar;