import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
//import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';
import {ChromePicker} from 'react-color';
import Draggable from 'react-draggable';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import ControlObject from './ControlObject';

class EditScreen extends Component {
    state = {
        name: " ",
        owner: " ",
        displayBackgroundColorPicker: false,
        displayTextColorPicker: false,
        displayBorderColorPicker: false,
        borderThickness: 1,
        borderRadius: 1,
        borderColor: "black",
        fontSize: 10,
        textColor: "black",
        backgroundColor: "white",
        text: "submit",
        width: 5,
        height: 5,
        zoom: 1,
        xPosition: 10,
        yPosition: 10,
        xSize: 5,
        ySize: 5,
        type: "container",
        selected: false
    }

    componentDidMount(){
        const firestore = getFirestore();
        this.props.wireframeList.date = new Date();
        firestore.collection("wireframeLists").doc(this.props.wireframeList.id).update({date: this.props.wireframeList.date});
    }

    handleChange = (e) => {
        const firestore = getFirestore();
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        if (target.id == "name"){
            firestore.collection("wireframeLists").doc(this.props.wireframeList.id).update({name: target.value});
        }
        else if (target.id == "owner"){
            firestore.collection("wireframeLists").doc(this.props.wireframeList.id).update({owner: target.value});
        }
    }

    showBackgroundColorPicker = () =>{
        this.setState({displayBackgroundColorPicker: true})
    }

    showBorderColorPicker = () =>{
        this.setState({displayBorderColorPicker: true})
    }

    showTextColorPicker = () =>{
        this.setState({displayTextColorPicker: true})
    }

    closeColorPicker = () =>{
        this.setState({displayTextColorPicker: false, displayBorderColorPicker: false, displayBackgroundColorPicker: false})
    }

    addContainer = () =>{
        this.setState({type: "container", 
        selected: false, 
        xPosition: 0, 
        yPosition: 0, 
        xSize: 50, 
        ySize: 50, 
        borderThickness: 5, 
        backgroundColor: "green", 
        borderRadius: 1, 
        borderColor: "blue"});
        //const firestore = getFirestore();
        /**this.props.wireframeList.controls.push({
            type: "container",
            selected : false,
            xPosition : 0,
            yPosition : 0,
            xSize : 50,
            ySize : 50,
            borderThickness : 5,
            backgroundColor : "green",
            borderRadius : 1,
            borderColor : "blue"
        })
        firestore.collection("wireframeLists").doc(this.props.wireframeList.id).update({controls: this.props.wireframeList.controls})**/
    }

    render() {
        const auth = this.props.auth;
        const wireframeList = this.props.wireframeList;
        const controls = wireframeList.controls;
        if (!auth.uid) {
            return <Redirect to='/' />;
        }

        return (
            <div className="row" onClick={this.state.displayBackgroundColorPicker || this.state.displayBorderColorPicker || this.state.displayTextColorPicker ? this.closeColorPicker : this.showColorPicker}>
                <div className="col s3" style={{backgroundColor:'red', height: "800px"}}>
                    <div>
                        <Button 
                        flat
                        icon={<Icon>zoom_in</Icon>}
                        medium
                        style={{marginLeft: "-10px"}}
                        onClick={this.zoomIn}
                        />
                        <Button 
                        flat
                        icon={<Icon>zoom_out</Icon>}
                        medium
                        style={{marginLeft: "-10px"}}
                        onClick={this.zoomOut}
                        />
                        <Button 
                        flat
                        medium
                        style={{marginLeft: "-10px"}}
                        onClick={this.saveWireframe}
                        >Save
                        </Button>
                        <Button 
                        flat
                        medium
                        style={{marginLeft: "-10px"}}
                        onClick={this.goHomeScreen}
                        >Close
                        </Button>
                    </div>
                    <div style={{textAlign: "center"}}>
                    <Button 
                        icon={<Icon>web</Icon>}
                        large
                        style={{textAlign: "center"}}
                        onClick={this.addContainer}
                    />
                    </div>
                    <div style={{textAlign: "center"}}>Container</div>
                    <div style={{textAlign: "center"}}>
                    <Button 
                        large
                        style={{textAlign: "center"}}
                        onClick={this.addLabel}
                    >Prompt for Input:</Button>
                    </div>
                    <div style={{textAlign: "center"}}>Label</div>
                    <div style={{textAlign: "center"}}>
                    <Button 
                        large
                        style={{textAlign: "center"}}
                        onClick={this.addTextButton}
                    >Submit</Button>
                    </div>
                    <div style={{textAlign: "center"}}>Button</div>
                    <div style={{textAlign: "center"}}>
                    <Button 
                        large
                        icon={<Icon>text_fields</Icon>}
                        style={{textAlign: "center"}}
                        onClick={this.addTextField}
                    ></Button>
                    </div>
                    <div style={{textAlign: "center"}}>Textfield</div>
                </div>
                <div className="col s6" style={{backgroundColor:'blue', height: "800px"}}>
                    {controls && controls.map(function(control) {
                        control.id = control.key;
                        if (this.state.type === "container"){
                            
                        }
                        return (
                            <ControlObject wireframeList={wireframeList} control={control} />
                        );})
                    }
                    <Draggable
                        handle=".handle"
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        //grid={[25, 25]}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}
                        >
                        <div>
                            <div className="handle">Drag from here</div>
                            <div>This readme is really dragging on...</div>
                        </div>
                    </Draggable>
                </div>
                <div className="col s3" style={{backgroundColor:'green', height: "800px"}}>
                    <div>Properties
                        <input className="active" type="text" onChange={this.editText}/>
                    </div>
                    <div>Font Size:
                        <input className="active" type="text"onChange={this.changeTextFontSize}/>
                    </div>
                    <div>Background:
                        <input 
                            className="active"
                            type="text" 
                            onClick={this.showBackgroundColorPicker}
                        />
                        {this.state.displayBackgroundColorPicker && (
                            <div className={"color-picker-palette"} style={{zIndex: "100"}}>
                                <div className={"color-picker-cover"}/>
                                <ChromePicker onChange={this.onChangeColorPicker}/>
                            </div>
                        )}
                    </div>
                    
                    <div>Border Color:
                        <input 
                            type="text" 
                            onClick={this.showBorderColorPicker}
                        />
                        {this.state.displayBorderColorPicker && (
                            <div className={"color-picker-palette"} style={{zIndex: "100"}}>
                                <div className={"color-picker-cover"}/>
                                <ChromePicker onChange={this.onChangeColorPicker}/>
                            </div>
                        )}
                    </div>
                    
                    <div>Text Color:
                        <input 
                            type="text" 
                            onClick={this.showTextColorPicker}
                        />
                        {this.state.displayTextColorPicker && (
                            <div className={"color-picker-palette"} style={{zIndex: "100"}}>
                                <div className={"color-picker-cover"}/>
                                <ChromePicker onChange={this.onChangeColorPicker}/>
                            </div>
                        )}
                    </div>

                    <div>Border Thickness:
                        <input className="active" type="text" onChange={this.changeBorderThickness}/>
                    </div>
                    <div>Border Radius:
                        <input className="active" type="text"/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframeLists } = state.firestore.data;
  const wireframeList = wireframeLists ? wireframeLists[id] : null;
  wireframeList.id = id;

  return {
    wireframeList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'wireframeLists' },
  ]),
)(EditScreen);