import React, { Component } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import BlogPreview from './blogPreview';
import Categories from './categories';

function AllPosts() {
    const param = useSearchParams()[0].get("tags") || "all";
    const location = useLocation();
    if(!location.pathname.startsWith(`/posts/all?tags=${param}`)) {
        window.history.replaceState(null, "", `/posts/all?tags=${param}`);
    }

    return (
        <React.Fragment>
            <div className='allPosts'>
                <Categories />
                <div className="allPosts-Container">
                    <BlogPreview num="all" tag={param} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default AllPosts;