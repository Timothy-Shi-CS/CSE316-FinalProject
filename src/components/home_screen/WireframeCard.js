import React from 'react';
import {Button, Icon} from 'react-materialize';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class WireframeCard extends React.Component {
    deleteDiagram = () =>{
        const firestore = getFirestore();
        firestore.collection("wireframeLists").doc(this.props.wireframeList.id).delete();
    }

    render() {
        const { wireframeList } = this.props;
        console.log("WireframeCard, wireframeList.id: " + wireframeList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframeList.name}</span>
                    <Button 
                        className="red"
                        icon={<Icon>close</Icon>}
                        small
                        onClick={this.deleteDiagram}
                        />
                </div>
            </div>
        );
    }
}
export default WireframeCard;