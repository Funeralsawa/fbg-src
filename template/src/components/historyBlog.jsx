import React, { Component } from 'react';
import { Link } from "react-router-dom";
import site from 'fbg-generated';

class HistoryBlog extends Component {
  render() {
    const posts = site.posts || [];

    return (
		<React.Fragment>
				<i className="bi bi-clock-history">&nbsp;往期文章</i>
				<div>
					<ul>
						{posts.length === 0 && (
						<li>
							<div className='title' style={{ color: "unset" }}>暂无文章</div>
						</li>
						)}
						{posts.map((p, index) => (
						<li key={index}>
							<div>
							<Link to={`/posts/${p.slug}`} className='title'>{p.title}</Link>
							<div className='time'>{p.date?.split("T")[0]}</div>
							</div>
						</li>
						))}
					</ul>
				</div>
		</React.Fragment>
    );
  }
}

export default HistoryBlog;
