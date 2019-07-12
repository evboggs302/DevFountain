import React, { useState, useEffect } from "react";
import { setDevelopers } from "../../dux/reducers/marketplaceReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UseFetch from "../usefetch";
import AppHeader from '../AppHeader/AppHeader';
import './MarketPlace.scss'

function MarketPlace(props) {
  console.log(props)
  
  // Rendering each developers info on marketplace
  const developers = props.marketplace.allDevelopers;
  
  // console.log(props)
  let mappedDevs;
  if (developers !== null) {
    mappedDevs = developers.map(dev => {
      const encoded = encodeURIComponent(dev.email);
      const default_pic = 'https://www.uic.mx/posgrados/files/2018/05/default-user.png'
    
      
      return (  
        <Link to={`/api/profile/${encoded}`} style={{ textDecoration: 'none' }} >
          <div key={dev.user_id} className='developer-card'>
            {!dev.profile_pic ? <img src= {default_pic} /> : <img src={dev.profile_pic} />}
            <h1 className='dev-name'>Name: {`${dev.first} ${dev.last}`}</h1>
            <h2 className='dev-title'>Title: {dev.title} </h2>
            <h2 className='dev-email'>Email: {dev.email}</h2>
            <button className='view-developer'>View Developer</button>
          </div>
        </Link>
      
      );
    });
  }

  return (
    <div>
     <AppHeader/>
      <main className='devs'>
        {mappedDevs}
      </main>
      
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  setDevelopers
};
const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(MarketPlace);
