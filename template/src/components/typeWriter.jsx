import React, { Component } from 'react';

class TypeWriter extends Component {
    state = {
        text: "",
        textIndex: 0,
        charIndex: 0,
        deleting: false,
    }

    componentDidMount() {
        this.startTyping();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    startTyping = () => {
        const { texts, speed = 100, pause = 1000 } = this.props;
        const { textIndex, charIndex, deleting } = this.state;

        const currentText = texts[textIndex];

        if (!deleting && charIndex <= currentText.length) {
            this.setState(
                {
                    text: currentText.slice(0, charIndex),
                    charIndex: charIndex + 1,
                },
                () => {
                    this.timer = setTimeout(this.startTyping, speed);
                }
            );
        } else if (deleting && charIndex >= 0) {
            this.setState(
                {
                    text: currentText.slice(0, charIndex),
                    charIndex: charIndex - 1,
                },
                () => {
                    this.timer = setTimeout(this.startTyping, speed / 2);
                }
            );
        } else {
            // 停顿后切换状态
            this.timer = setTimeout(() => {
                if (!deleting) {
                    this.setState({ deleting: true });
                    this.startTyping();
                } else {
                    this.setState(
                        {
                            deleting: false,
                            textIndex: (textIndex + 1) % texts.length,
                            charIndex: 0,
                        },
                        () => {
                            this.props.onTypingEnd();
                            this.startTyping();
                        }
                    );
                }
            }, pause);
        }
    };

    render() { 
        return (
            <React.Fragment>
                <div className="typewriter">
                    <span>{this.state.text}</span>
                    <span className="cursor">|</span>
                </div>
            </React.Fragment>
        );
    }
}
 
export default TypeWriter;