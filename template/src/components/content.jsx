import React, { Component } from 'react';
import ContentPosts from './contentPosts';
import ContentAside from './contentAside';

class Content extends Component {
    state = {  } 
    render() {
        return (
            <React.Fragment>
                <div className="content">
                    <ContentPosts />
                    <ContentAside />
                </div>
            </React.Fragment>
        );
    }
}
 
export default Content;