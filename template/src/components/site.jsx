import React, { Component } from 'react';
import Navbar from './navbar';
import Head from './head';
import Content from './content';
import AllPosts from './allPosts';
import Footer from './footer';
import BlogApp from './blogApp';
import AsideNavbar from './asideNavbar';
import PaperBanner from './paperBanner';
import Error404 from './404';
import Search from './search';
import ClickAnime from './clickAnime';
import {Routes, Route, useLocation, Navigate} from "react-router-dom";

class Site extends Component {
    state = {
        is_mobile: window.innerWidth < 768
    }

    componentDidMount() {
        this.updateBackground(this.props.location.pathname);
    }


    componentDidUpdate(prevprops) {
        if(this.props.location.pathname !== prevprops.location.pathname) {
            this.updateBackground(this.props.location.pathname);
        }
    }

    updateBackground = (pathname) => {
        if (pathname.startsWith("/posts/") && pathname !== "/posts/all" && pathname !== "/posts/search") {
            document.body.style.backgroundImage = "";
        }
        else {
            document.body.style.backgroundImage = `var(--body-background)`;
        }
    }

    render() { 
        return (
            <React.Fragment>
                <ClickAnime />
                <Navbar />
                <Routes>
                    <Route path="/" element={(
                        <React.Fragment>
                        <Head />
                        <Content />
                        </React.Fragment>
                    )} />
                    <Route path="/posts/all" element={<AllPosts />} />
                    <Route path="/posts/:name" element={(
                        <>
                            <div className="blog-content-container">
                                <PaperBanner />
                                <div className='blog-content'>
                                    <BlogApp />
                                    <AsideNavbar />
                                </div>
                            </div>
                        </>
                    )} />
                    <Route path="/posts/search" element={<Search />} />
                    <Route path="/404" element={<Error404 />}></Route>
                    <Route path="*" element={<Navigate replace to="/404" />}></Route>
                </Routes>
                <Footer />
            </React.Fragment>
        );
    }
}

export default function SiteWrapper() {
    const location = useLocation();
    return <Site location={location} />
}