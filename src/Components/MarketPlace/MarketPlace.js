<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import axios from 'axios'
import {setDevelopers} from '../../dux/reducers/marketplaceReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UseFetch from '../usefetch'

function MarketPlace(props) {

  // Setting all users who are developers into the marketplaceReducer 
  const {data: devUsers, fetchData: allDevs}= UseFetch('/api/marketplace')
  let devs = devUsers
  useEffect(() => {
    props.setDevelopers(devs)
  }, [devs])

    
    // Rendering each developers info on marketplace
    const developers = props.marketplaceReducer.allDevelopers
    let mappedDevs
    if(developers.length > 0){
      mappedDevs = developers.map(dev => {
        const encoded = encodeURIComponent(dev.email)
        return (
          <Link to={`/api/profile/${encoded}`}> 
            <div key={dev.user_id} >
              <img src={dev.profile_pic} />
              <h1>{`${dev.first} ${dev.last}`}</h1>
              <h2>{dev.title}</h2>
              <h2>{dev.email}</h2>
            </div>
          </Link>
        )
      })
    }
   
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { setDevelopers } from "../../dux/reducers/marketplaceReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function MarketPlace(props) {
  const [allDevs, setDevs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/marketplace")
      .then(res => {
        console.log(res.data);
        setDevs(res.data);
      })
      .catch(err => console.log("this is the error", err));
  }, []);

  useEffect(() => {
    props.setDevelopers(allDevs);
  }, [allDevs]);

  // Rendering each developers info on marketplace
  const developers = props.marketplaceReducer.allDevelopers;
  let mappedDevs;
  if (developers.length > 0) {
    mappedDevs = developers.map(dev => {
      const encoded = encodeURIComponent(dev.email);
      return (
        <Link to={`/api/profile/${encoded}`}>
          <div key={dev.user_id}>
            <img src={dev.profile_pic} />
            <h1>{`${dev.first} ${dev.last}`}</h1>
            <h2>{dev.title}</h2>
            <h2>{dev.email}</h2>
          </div>
        </Link>
      );
    });
  }

  //   let mappedDevs;
  //     {props.allDevelopers ?
  //       mappedDevs = props.marketplaceReducer.allDevelopers.map(dev => {

  //       const encoded = encodeURIComponent(dev.email)
  //     return (
  //       <div key={dev.id}>
  //         <Link to={`/api/profile/${encoded}`}>
  //           <img
  //             src={dev.profile_pic}
  //             alt="image"
  //           >
  //             Dev profile pic
  //           </img>
  //         </Link>
  //         <h3>{`${dev.first} ${dev.last}`}</h3>
  //         <div>Dev Skills</div>
  //       </div>
  //     );
  //   })
  //   : null
  // }

>>>>>>> 45d393da3e13b25de4735385045b9604bbec2048
  return (
    <div>
      Mapped Devs
      {mappedDevs}
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
