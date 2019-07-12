import React, { Component } from 'react';
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";

function RecProfile(props){
    console.log(props)
        return (
            <div>
                {this.props.user.email === this.props.match.params.email ?
                <button>Edit buttons</button> :
                <button>Like</button>
                }
            </div>
        )
    }

const mapStateToProps = reduxState => {
    return reduxState;
};

const mapDispatchToProps = {
    setUser
};
      
const invokedConnect = connect(
    mapStateToProps,mapDispatchToProps
    );
      
export default invokedConnect(RecProfile)