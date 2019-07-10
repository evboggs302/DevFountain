import React, { Component } from 'react';
import RegisterForm from './RegisterForm/RegisterForm'
import Header from '../Header/Header'


class Home extends Component {
    
    render () {
        // console.log(props)
        return (
            <div>
                <div>
                    {/* <Header/> */}
                </div>
                Home
                <RegisterForm />
            </div>
        )
    }
   
}


export default Home