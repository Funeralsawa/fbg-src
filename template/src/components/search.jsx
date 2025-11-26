import { useEffect, useState } from 'react';
import site from 'fbg-generated';
import { useLocation, useSearchParams } from 'react-router-dom';
import AllPosts from './allPosts';

export default function Search() {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const keyword = decodeURIComponent(searchParams.get("keyword") || "").toLowerCase();

    useEffect(() => {
        if(keyword.length === 0) {
            setFilteredPosts([]);
            return;
        }

        const results = site.posts.filter(post => {
            if(post.title.toLowerCase().includes(keyword)) return true;
            if(post.createdDate.toLowerCase().includes(keyword)) return true;
            if(post.summary.toLowerCase().includes(keyword)) return true;
            if(post.tags.some(tag => tag.toLowerCase().includes(keyword))) return true;
            if(post.slug.toLowerCase().includes(keyword)) return true;
            if(post.lastModifyDate.toLowerCase().includes(keyword)) return true;
            return false;
        });

        setFilteredPosts(results);
    }, [location]);
    return (
        <AllPosts POSTS={filteredPosts} />
    )
}