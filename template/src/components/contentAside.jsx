import React, { Component } from 'react';
import BlogData from './blogData';
import HistoryBlog from './historyBlog';
import site from 'fbg-generated';

class ContentAside extends Component {
    state = { 
        is_mobile: window.innerWidth < 768
    } 
    render() { 
        return (
            <React.Fragment>
                <div className='content-aside'>
                    <div className="content-aside-bloginfo card-widget">
                        <img src={`/assets/${site.author.avatar}`} alt="headImg" draggable="false" />
                        <p>{site.author.name}</p>
                        <BlogData />
                        <a href={site.links.github} target="_blank">
                            <i className="bi bi-github github"></i>
                            &nbsp;
                            Follow Me
                        </a>
                        <div className='content-aside-link'>
                            <a href={`mailto:${site.links.email}`} target='_blank' title='Email'>
                                <i className="bi bi-envelope mail"></i>
                            </a>
                            <a href={site.links.discord} target="_blank" title='discord'>
                                <i className="bi bi-discord dc"></i>
                            </a>
                            <a href={site.links.github} target="_blank" title='github'>
                                <i className="bi bi-github github"></i>
                            </a>
                        </div>
                    </div>
                    <div className="content-aside-announce card-widget">
                        <i className="bi bi-geo-alt">&nbsp;{site.author.location}</i>
                        <p>
                            {site.author.bio}                               
                        </p>
                    </div>
                    <div className="content-aside-newest-essay card-widget">
                        <HistoryBlog />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default ContentAside;