import React from 'react';
import './Column.css';

export default class Column extends React.Component {
    render() {
        let columnStyle = {
            height: "" + (this.props.value*5) + "px"
        }

        return(
            <div className="column" style={columnStyle}></div>
        );
    }
}