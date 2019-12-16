import React from 'react';
import {Rnd} from 'react-rnd';

class ControlObject extends React.Component {
    state = {
        selected: this.props.control.selected,
        zoom: this.props.control.zoom,
        name: this.props.control.name,
        type: this.props.control.type,
        borderThickness: this.props.control.borderThickness,
        borderRadius: this.props.control.borderRadius,
        borderColor: this.props.control.borderColor,
        fontSize: this.props.control.fontSize,
        textColor: this.props.control.textColor,
        backgroundColor: this.props.control.backgroundColor,
        text: this.props.control.text,
        x: this.props.control.x,
        y: this.props.control.y,
        width: this.props.control.width,
        height: this.props.control.height,
        key: this.props.control.key,
        //selectedControl: null
    }

    setControlPosition = (bind, a, b) =>{
        this.setState({x: a, y: b});
        //this.props.control.x = this.state.x;
        //this.props.control.y = this.state.y;
    }

    setControlSize = (bind, a, b)=>{
        this.setState({width: a, height: b});
        //this.props.control.width = this.state.width;
        //this.props.control.height = this.state.height;
    }
    clickHandler = () =>{
        this.props.clickHandler(this.props.control)
    }
    /**isSelected = (e) => {
        this.setState({selectedControl: e.target})
        console.log(this.state.selectedControl)
    }*/
    render() {
        const { control } = this.props;  
        return (
            control.type == "container" ? 
                <Rnd
                bounds={'parent'}
                size={{ width: this.state.width,  height: this.state.height }}
                style={{borderRadius: control.borderRadius, borderStyle: "solid", borderWidth: control.borderThickness, borderColor: control.borderColor, background: control.backgroundColor}}
                position={{ x: this.state.x, y: this.state.y }}
                /**onDragStop={(e, d) => { this.setControlPosition(d.x, d.y) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setControlSize(ref.style.width, ref.style.height);
                }}*/
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setState({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                });
                }}
                onClick={this.clickHandler}
                >
                </Rnd>
                : control.type == "label" ? 
                <Rnd
                bounds={'parent'}
                size={{ width: this.state.width,  height: this.state.height }}
                style={{borderRadius: control.borderRadius, color: control.textColor, fontSize: control.fontSize, textAlign: "center", borderStyle: "solid", borderWidth: control.borderThickness, borderColor: control.borderColor, background: control.backgroundColor}}
                position={{ x: this.state.x, y: this.state.y }}
                /**onDragStop={(e, d) => { this.setControlPosition(d.x, d.y) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setControlSize(ref.style.width, ref.style.height);
                }}*/
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setState({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                });
                }}
                onClick={this.clickHandler}
                >
                {control.text}
                </Rnd>
                : control.type == "textButton" ? 
                <Rnd
                bounds={'parent'}
                size={{ width: this.state.width,  height: this.state.height }}
                style={{borderRadius: control.borderRadius, color: control.textColor, fontSize: control.fontSize, textAlign: "center", borderStyle: "solid", borderWidth: control.borderThickness, borderColor: control.borderColor, background: control.backgroundColor}}
                position={{ x: this.state.x, y: this.state.y }}
                /**onDragStop={(e, d) => { this.setControlPosition(d.x, d.y) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setControlSize(ref.style.width, ref.style.height);
                }}*/
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setState({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                });
                }}
                onClick={this.clickHandler}
                >
                {control.text}
                </Rnd> 
                : control.type == "textField" ? 
                <Rnd
                bounds={'parent'}
                size={{ width: this.state.width,  height: this.state.height }}
                style={{ borderRadius: control.borderRadius, color: control.textColor, fontSize: control.fontSize, textAlign: "center", borderStyle: "solid", borderWidth: control.borderThickness, borderColor: control.borderColor, background: control.backgroundColor}}
                position={{ x: this.state.x, y: this.state.y }}
                /**onDragStop={(e, d) => { this.setControlPosition(d.x, d.y) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setControlSize(ref.style.width, ref.style.height);
                }}*/
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                this.setState({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                });
                }}
                onClick={this.clickHandler}
                >
                {control.text}
                </Rnd> : <div></div>
            );
        }
    }
export default ControlObject;