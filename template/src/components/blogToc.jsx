import React, { Component } from 'react';
import { connect } from "react-redux";

class BlogToc extends Component {
    state = {  } 

    constructor(props){
        super(props);
        this.rootRef = React.createRef();
    }

    handleTOCClick = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const topOffset = el.getBoundingClientRect().top + window.scrollY; 
            window.scrollTo({
                top: topOffset,
                behavior: "smooth",
            });
        }
    };

    render() { 
        const {activeId, toc} = this.props;
        return (
            <React.Fragment>
                <div style={{
                    width: "100%",
                    textAlign: "left"
                }}>
                    <h3 align="center">目录</h3>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {toc.map(({ id, text, depth }) => (
                        <li
                        key={id}
                        style={{
                            marginLeft: (depth - 1) * 25,
                            marginBottom: 6,
                            fontWeight: activeId === id ? "bold" : "normal",
                        }}
                        >
                        <a
                            href={`#${id}`}
                            onClick={(e) => this.handleTOCClick(e, id)}
                            style={{
                            color: activeId === id ? "#0366d6" : "#333",
                            textDecoration: "none",
                            cursor: "pointer",
                            }}
                        >
                            {text}
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    activeId: state.id,
    toc: state.toc
})
 
export default connect(mapStateToProps, null)(BlogToc);