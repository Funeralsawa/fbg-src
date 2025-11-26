import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import site from 'fbg-generated';

export default function BlogPreview(props) {
	const [previews, setPreviews] = useState(site.posts);
	const posts = site.posts || [];
	const location = useLocation();
	const reverseTags = {
        "all" : "全部",
        "IT" : "IT",
        "life" : "生活",
        "study" : "学习",
        "trip" : "旅行",
        "dream" : "梦话",
        "others": "其他"
    };
	useEffect(() => {
		const {num, tag, POSTS} = props;
		let filteredPosts = [];
		if(!POSTS) {
            if(tag != "all") {
                for(let post of posts) {
                    for(let t of post.tags) {
                        if(t == reverseTags[tag]) {
                            filteredPosts.push(post);
                        }
                    }
                }
            } else {
                filteredPosts = posts;
            }
        } else {
            filteredPosts = POSTS;
        }
		setPreviews(filteredPosts);
	}, [location])
	
	return (
		<div className="preview-container">
			{previews.map((post, i) => (
			<Link key={i} to={`/posts/${post.slug}`} className="preview-card card-widget">
				<h3 className="preview-title">{post.title}</h3>
				<p className="preview-content">
				{(post.summary && String(post.summary)) || (post.content || '').slice(0, 150) + '...'}
				</p>
			</Link>
			))}
		</div>
	);
}
