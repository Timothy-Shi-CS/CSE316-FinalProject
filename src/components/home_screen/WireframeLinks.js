import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';

class WireframeLinks extends React.Component {
    render() {
        const wireframeLists = this.props.wireframeLists;
        console.log(wireframeLists);
        if (wireframeLists !== undefined){
            wireframeLists.sort(function(a,b){
                if (a.date < b.date) {return 1;}
                if (a.date > b.date) {return -1;}
                return 0;
            });
        }
        return (
            <div className="todo-lists section">
                {wireframeLists && wireframeLists.map(wireframeList => (
                    <Link to={'/wireframeList/' + wireframeList.id} key={wireframeList.id}>
                        <WireframeCard wireframeList={wireframeList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframeLists: state.firestore.ordered.wireframeLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);