import React, { Component } from 'react';
import InfoDrawer from './infoDrawer';
import site from 'fbg-generated';

class Navbar extends Component {
    state = {
        hidden: true,
        transparent: true,
        open: false,
    } 

    lastScrollY = 0;
    navRef = React.createRef();

    handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > this.lastScrollY) {
            this.setState({ hidden: true });
        } else {
            this.setState({ hidden: false });
        }

        if (currentScrollY <= 0) {
            this.setState({ transparent: true });
        } else {
            this.setState({ transparent: false });
        }

        this.lastScrollY = currentScrollY;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(() => {
            this.navRef.current.classList.add("nav-begin");
        }, 100);
        
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    onClick = () => {
        window.location.href = "/";
    }

    handleSubscribeClick = () => {
        const subscribeContent = document.getElementsByClassName("subscribe-content")[0];
        if(subscribeContent.style.transform === "translateX(120%)") {
            subscribeContent.style.transform = "translateX(0%)";
        }
        else { 
            subscribeContent.style.transform = "translateX(120%)";
        }
    }

    setOpen = (flag) => {
        this.setState({
            open: flag
        })
    }

    style1 = {
        userSelect: "none",
        cursor: "pointer",
        marginLeft: "1%"
    }

    render() { 
        return (
            <React.Fragment>
                <nav className={`navbar navbar-expand-lg ${this.state.hidden ? 'nav-hidden' : 'nav-appear'}
                    ${this.state.transparent ? 'nav-transparent' : ''}`} 
                    ref={this.navRef}>
                    <div className="container-fluid" style={{color: "white"}}>
                        <div onClick={this.onClick} className='navbar-brand' style={this.style1}>
                            <img className="nav-icon" src={`/assets/${site.author.avatar}`} alt="icon" draggable="False" />
                            <div className='nav-title'>{site.author.name}'s blog</div>
                        </div>
                        <div className="nav-links">
                            <a href="/">
                                <i className="bi bi-house-door-fill"></i>
                                &nbsp;
                                首页
                            </a>
                        </div>
                        <div className="drawer-toggle" onClick={() => this.setOpen(true)}>☰</div>
                    </div>
                    <div className={`info-drawer ${this.state.open ? 'open' : ''}`}>
                        <div className="drawer-content">
                            <InfoDrawer />
                        </div>
                    </div>
                    <div className={`info-drawer-overray ${this.state.open ? 'open' : ''}`}
                            onClick={() => this.setOpen(false)}>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default Navbar;