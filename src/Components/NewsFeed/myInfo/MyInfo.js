import React from 'react'
import {connect} from 'react-redux'


function MyInfo(props) {
    const {user} = props.user
    console.log(user)
    
    return (
        <div>
            My info
        </div>
    )
}

const mapPropsToState = reduxState => {
    return reduxState
}

const myConnect = connect(mapPropsToState)


export default myConnect(MyInfo)