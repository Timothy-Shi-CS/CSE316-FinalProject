import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize';
import ControlObject from './ControlObject';

class EditScreen extends Component {
    state = {
        name: this.props.wireframeList.name,
        owner: " ",
        controls: this.props.wireframeList.controls,
        saved: false,
        wireframeWidth: this.props.wireframeList.wireframeWidth,
        wireframeHeight: this.props.wireframeList.wireframeHeight,
        selectedControl: null,
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

    goHomeScreen = () =>{
        this.props.history.push('/');
    }

    saveWireframe = () =>{
        const firestore = getFirestore();
        console.log(this.state.controls)
        firestore.collection("wireframeLists").doc(this.props.wireframeList.id).update({controls: this.state.controls, name: this.state.name})
    }

    saveWireframeClose = ()=>{
        const firestore = getFirestore();
        console.log(this.state.controls)
        firestore.collection("wireframeLists").doc(this.props.wireframeList.id).update({controls: this.state.controls, name: this.state.name})
        this.props.history.push('/');
    }

    changeWireframeName = (e) =>{
        this.setState({name: e.target.value})
    }

    addLabel = () =>{
        var unsavedControls = this.state.controls;
        unsavedControls.push({
            key: this.props.wireframeList.controls.length,
            type: "label",
            selected: false,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            borderThickness: 5,
            backgroundColor: "white",
            borderRadius: 1,
            borderColor: "black",
            text: "label",
            textColor: "black",
            fontSize: 12
        })
        this.setState({controls: unsavedControls})
        //this.setState({type: "label"})
    }

    addTextButton = () =>{
        var unsavedControls = this.state.controls;
        unsavedControls.push({
            key: this.props.wireframeList.controls.length,
            type: "textButton",
            selected: false,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            borderThickness: 5,
            backgroundColor: "white",
            borderRadius: 1,
            borderColor: "black",
            text: "text button",
            textColor: "black",
            fontSize: 12,
        })
        this.setState({controls: unsavedControls})
        //this.setState({type: "textButton"})
    }

    addTextField = () =>{
        var unsavedControls = this.state.controls;
        unsavedControls.push({
            key: this.props.wireframeList.controls.length,
            type: "textField",
            selected: false,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            borderThickness: 5,
            backgroundColor: "white",
            borderRadius: 1,
            borderColor: "black",
            text: "text field",
            textColor: "black",
            fontSize: 12
        })
        this.setState({controls: unsavedControls})
        //this.setState({type: "textField"})
    }
    isSelected = (a) => {
        this.setState({selectedControl: a})
        console.log(this.state.selectedControl)
    }
    addContainer = () =>{
        var unsavedControls = this.state.controls;
        unsavedControls.push({
            key: this.props.wireframeList.controls.length,
            type: "container",
            selected : false,
            x: 0, 
            y: 0, 
            width: 100, 
            height: 100, 
            borderThickness: 5, 
            backgroundColor: "black", 
            borderRadius: 1, 
            borderColor: "white"
        })
        this.setState({controls: unsavedControls});

    }
    editText = (e) =>{
        this.state.selectedControl.text = e.target.value
    }
    changeTextFontSize = (e) =>{
        this.state.selectedControl.fontSize = e.target.value + "px"
    }
    changeBorderThickness = (e) =>{
        this.state.selectedControl.borderThickness = e.target.value + "px"
    }
    backgroundColorPicker = (e) =>{
        this.state.selectedControl.backgroundColor = e.target.value
    }
    borderColorPicker = (e) =>{
        this.state.selectedControl.borderColor = e.target.value
    }
    textColorPIcker = (e) =>{
        this.state.selectedControl.textColor = e.target.value
    }
    render() {
        const auth = this.props.auth;
        const wireframeList = this.props.wireframeList;
        const controls = wireframeList.controls;
        if (!auth.uid) {
            return <Redirect to='/' />;
        }

        return (
            <div className="row">
                <div className="col s3" style={{backgroundColor:'white', height: "800px"}}>
                    <div>
                        <Button 
                        flat
                        icon={<Icon>zoom_in</Icon>}
                        style={{marginLeft: "-10px"}}
                        onClick={this.zoomIn}
                        />
                        <Button 
                        flat
                        icon={<Icon>zoom_out</Icon>}
                        style={{marginLeft: "-10px"}}
                        onClick={this.zoomOut}
                        />
                        <Button 
                        flat
                        style={{marginLeft: "-10px"}}
                        onClick={this.saveWireframe}
                        >Save
                        </Button>
                        <Button 
                        href="#modal1"
                        style={{marginLeft: '437px', background: 'black'}}
                        className="modal-trigger"
                        flat
                        style={{marginLeft: "-10px"}}
                        //onClick={this.goHomeScreen}
                        >Close
                        </Button>
                        <div>
                            <Modal id="modal1" header="Save Wireframe before Closing?" 
                        actions={
                            <React.Fragment>
                            <Button onClick={this.saveWireframeClose} style={{background: 'black', marginRight: "5px"}}>
                                Yes
                            </Button>
                            <Button modal="close" style={{background: 'black'}} onClick={this.goHomeScreen}>
                                No
                            </Button>
                            </React.Fragment>
                        }>
                            Do you want to save the wireframe?
                        </Modal>
                        </div>
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
                <div className="col s6" style={{backgroundColor:'gray', height: "800px"}}>
                    {this.state.controls && this.state.controls.map(function(control) {
                        control.id = control.key;
                        return (
                            <ControlObject wireframeList={wireframeList} control={control} clickHandler={this.isSelected}/>
                        );},this)
                    }
                </div>
                <div className="col s3" style={{backgroundColor:'white', height: "800px"}}>
                    
                    <div>Wireframe Name:
                        <input className="active" type="text" defaultValue={wireframeList.name} onChange={this.changeWireframeName}/>
                    </div>
                    <div>Properties
                        <input className="active" type="text" defaultValue={this.state.selectedControl == null ? "": this.state.selectedControl.text} onChange={this.editText}/>
                    </div>
                    <div>Font Size:
                        <input className="active" type="number" defaultValue={this.state.selectedControl == null ? "": this.state.selectedControl.fontSize} onChange={this.changeTextFontSize}/>
                    </div>
                    <div>Background:
                        <input 
                            className="active"
                            type="color" 
                            onChange={this.backgroundColorPicker}
                            defaultColor={this.state.selectedControl == null ? "": this.state.selectedControl.backgroundColor}
                        />
                    </div>
                    
                    <div>Border Color:
                        <input 
                            type="color" 
                            onChange={this.borderColorPicker}
                            defaultColor={this.state.selectedControl == null ? "": this.state.selectedControl.borderColor}
                        />
                    </div>
                    
                    <div>Text Color:
                        <input 
                            type="color" 
                            onChange={this.textColorPicker}
                            defaultColor={this.state.selectedControl == null ? "": this.state.selectedControl.textColor}
                        />
                    </div>

                    <div>Border Thickness:
                        <input className="active" type="number" 
                        defaultValue={this.state.selectedControl == null ? "": this.state.selectedControl.borderThickness}
                        onChange={this.changeBorderThickness}/>
                    </div>
                    <div>Border Radius:
                        <input className="active" type="number"
                        />
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