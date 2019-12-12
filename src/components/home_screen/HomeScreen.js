import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks';
import { getFirestore } from 'redux-firestore';
import {Button, Icon} from 'react-materialize';

class HomeScreen extends Component {
    state = {
        listId: null
    }
    handleNewList = (e) =>{
        const firestore = getFirestore();
        const { target } = e;
        firestore.collection("wireframeLists").add({
            date: new Date(),
            name: "unknown",
            owner: "unknown",
            controls: []
        }).then(docRef => {
            this.setState({listId: docRef.id});
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if (this.state.listId != null){
            return <Redirect to={'/wireframeList/' + this.state.listId}/>;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks wireframeLists={this.props.wireframeLists}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                        Wireframer<br />
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframeLists' },
    ]),
)(HomeScreen);