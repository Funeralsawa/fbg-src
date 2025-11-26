import React, { Component } from 'react';
import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import BlogPreview from './blogPreview';
import Categories from './categories';

function AllPosts(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("tags") || "all";
    const location = useLocation();

    useEffect(() => {
        setSearchParams(prev => {
            if (!prev.get("tags") && location.pathname === "/posts/all") {
                return { tags: param };
            }
            return prev;
        });
    }, [location.pathname]);

    return (
        <React.Fragment>
            <div className='allPosts'>
                {props.POSTS ? null : <Categories />}
                {props.POSTS && props.POSTS.length == 0 ? (
                    <h1 className="no-results" style={{color: "red", textAlign: "center" }}>未找到相关内容</h1>
                ) : (
                <div className="allPosts-Container">
                    <BlogPreview num="all" tag={param} POSTS={props.POSTS || null}/>
                </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default AllPosts;