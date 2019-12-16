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
        borderThickness: 1,
        borderRadius: 1,
        borderColor: "black",
        fontSize: 10,
        textColor: "black",
        backgroundColor: "white",
        text: "submit",
        zoom: 1,
        type: null,
        selected: false,
        x: 0,
        y: 0
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
        /**this.setState({type: "container", 
        selected: false, 
        x: 0, 
        y: 0, 
        width: 50, 
        height: 50, 
        borderThickness: 5, 
        backgroundColor: "green", 
        borderRadius: 1, 
        borderColor: "blue"});
        console.log(this.state.type);*/

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
                        flat
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
                <div className="col s6" style={{backgroundColor:'gray', height: "800px"}}>
                    {this.state.controls && this.state.controls.map(function(control) {
                        control.id = control.key;
                        return (
                            <ControlObject wireframeList={wireframeList} control={control} />
                        );})
                    }
                </div>
                <div className="col s3" style={{backgroundColor:'white', height: "800px"}}>
                    
                    <div>Wireframe Name:
                        <input className="active" type="text" defaultValue={wireframeList.name} onChange={this.changeWireframeName}/>
                    </div>
                    <div>Properties
                        <input className="active" type="text" onChange={this.editText}/>
                    </div>
                    <div>Font Size:
                        <input className="active" type="number"onChange={this.changeTextFontSize}/>
                    </div>
                    <div>Background:
                        <input 
                            className="active"
                            type="color" 
                            onClick={this.showBackgroundColorPicker}
                        />
                    </div>
                    
                    <div>Border Color:
                        <input 
                            type="color" 
                            onClick={this.showBorderColorPicker}
                        />
                    </div>
                    
                    <div>Text Color:
                        <input 
                            type="color" 
                            onClick={this.showTextColorPicker}
                        />
                    </div>

                    <div>Border Thickness:
                        <input className="active" type="number" onChange={this.changeBorderThickness}/>
                    </div>
                    <div>Border Radius:
                        <input className="active" type="number"/>
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