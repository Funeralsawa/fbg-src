import React, { Component } from 'react';
import { useRef } from 'react';
import HistoryBlog from './historyBlog';
import BlogData from './blogData';
import site from "fbg-generated";

function InfoDrawer() {
    const searchInputRef = useRef(null);

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
            <div className='info-drawer-content'>
                <div className="info-drawer-content-bloginfo">
                    <img src={`/assets/${site.author.avatar}`} alt="headImg" draggable="false" />
                    <BlogData />
                </div>
                <div className="info-drawer-content-somefunction info-drawer-content-card-widget">
                    <a href="/">
                        <i className="bi bi-house-door-fill"></i>
                        &nbsp;
                        首页
                    </a>
                    <div className="nav-bar-search">
                        <input type="text" ref={searchInputRef} 
                        className="nav-bar-search-input" placeholder="标题/作者/年份/概要"
                        onKeyDown={(e) => handleSearchKeyDown(e)} />
                    </div>
                </div>
                <div className="content-aside-newest-essay info-drawer-content-card-widget">
                    <HistoryBlog />
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default InfoDrawer;