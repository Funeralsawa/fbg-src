import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import site from 'fbg-generated';

export default class BlogData extends Component {
  render() {
    const papers = site.posts?.length || 0;
    const tags = new Set((site.posts || []).flatMap(p => p.tags || [])).size;
    const category = 0;
    return (
      <div className='blog-data'>
        <Link className="blog-data-el" to="/posts/all">
          <div className="blog-data-title">文章</div>
          <div className="blog-data-num">{papers}</div>
        </Link>
        <Link className="blog-data-el" to="/posts/all">
          <div className="blog-data-title">标签</div>
          <div className="blog-data-num">{tags}</div>
        </Link>
        <Link className="blog-data-el" to="/posts/all">
          <div className="blog-data-title">分类</div>
          <div className="blog-data-num">6</div>
        </Link>
      </div>
    );
  }
}
