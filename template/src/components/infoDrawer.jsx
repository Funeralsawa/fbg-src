import React, { Component } from 'react';
import HistoryBlog from './historyBlog';
import BlogData from './blogData';
import site from "fbg-generated";

class InfoDrawer extends Component {
    state = {} 
    
    render() { 
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
                    </div>
                    <div className="content-aside-newest-essay info-drawer-content-card-widget">
                        <HistoryBlog />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default InfoDrawer;