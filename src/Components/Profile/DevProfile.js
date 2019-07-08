import React, { Component } from 'react';


class DevProfile extends Component {
    render () {
        return (
            <div>
                {this.props.user.email === this.props.match.params.email ?
                <button>Edit buttons</button> :
                <button>Like</button>
                }
            </div>
        )
    }
   
}

export default DevProfile