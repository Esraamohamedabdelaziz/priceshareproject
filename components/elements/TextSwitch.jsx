import React, { Component } from 'react';

class TextSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedText: null,
            index: 1,
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { text1, text2 } = this.props;
            const textArrayProps = [text1, text2];
            var { index } = this.state;
            var newIndex = 0;
            if (index == 1) {
                newIndex = 0;
            } else if (index == 0) {
                newIndex = 1;
            }
            index = newIndex;
            const displayedText = textArrayProps[newIndex];
            this.setState({ displayedText, index });
        }, 1500);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    render() {
        const { displayedText } = this.state;
        return displayedText;
    }
}

export default TextSwitch;
