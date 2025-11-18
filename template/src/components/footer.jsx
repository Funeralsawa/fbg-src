import React, { Component } from 'react';
import site from 'fbg-generated';

class Footer extends Component {
    state = {  }

    getcurrentYear = () => {
        return new Date().getFullYear();
    }

    render() { 
        return (
            <div className='footer'>
                <p>2025 - {this.getcurrentYear()} By {site.author.name} | 简洁即美</p>
            </div>
        );
    }
}
 
export default Footer;