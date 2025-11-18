import React, { Component } from 'react';
import TypeWriter from './typeWriter';
import site from 'fbg-generated';

class Head extends Component {
    state = {
        change: false
    }

    ref = React.createRef();

    texts = {
        text1: `${site.ui.typeWriterWords[0]}`,
        text2: `${site.ui.typeWriterWords[1]}`,
    }

    onTypingEnd = () => {
        this.setState((preState) => {
            return {
                change: !preState.change
            }
        })
    }

    handleClick = () => {
        const el = this.ref.current;
        const rect = el.getBoundingClientRect();
        const offset = rect.bottom;

        window.scrollBy({
            top: offset,
            behavior: 'smooth',
        });
    }

    render() { 
        const { change } = this.state;
        const currentText = change ? this.texts.text2 : this.texts.text1;

        return (
            <React.Fragment>
                <div className="head" ref={this.ref}>
                    <div className='head-overray'></div>
                    <div className='head-text'>
                        <div className="title">
                            {`${site.site.title}`.split("").map((char, index) => (
                                <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                    {char}
                                </span>
                            ))}
                        </div>
                        <div className="subtitle">
                            <TypeWriter
                                texts={[currentText]}
                                speed={200}
                                pause={1500}
                                onTypingEnd={this.onTypingEnd}
                            />
                        </div>
                    </div>
                    <p className='float-arrow' onClick={this.handleClick}>
                        <i className="bi bi-caret-down"></i>
                    </p>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Head;