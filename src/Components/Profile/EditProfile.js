import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import usefetch from "../usefetch";
import { connect, useDispatch } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";
import Axios from "axios";


const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/devmountain-phx/image/upload'



function EditProfile(props) {
  console.log(props);
  const {
    developer,
    email,
    first,
    last,
    linkedin,
    portfolio,
    profile_pic,
    title,
    user_id
  } = props.user.user;

  let [newFirst, setFirst] = useState(null);
  let [newLast, setLast] = useState(null);
  let [newTitle, setTitle] = useState(null);
  let [newLinked, setLinked] = useState(null);
  let [newPortfolio, setPortfolio] = useState(null);
  let [className, setClassName] = useState("profile edit");
  let [uploadedImage, setUploadedImage] = useState("");
  let [loading, setLoading] = useState(false);


  let { postDataWithId: updateInfo } = usefetch("/api/edit", false);

  const finished = () => {
    let dataToPost = {
      first: newFirst || first,
      last: newLast || last,
      title: newTitle || title,
      linkedin: newLinked || linkedin,
      portfolio: newPortfolio || portfolio
      // profile_pic: newPic || profile_pic
    };
    updateInfo(user_id, dataToPost);
    setClassName("profile");
  };

  //cloudinary.
  //this function will initiate the signature request from the server when someone has uploaded an image to the client.
  const handleImageUpload = (file) => {
    //axios call to server to request hashed signature
    Axios.get('/api/upload').then(response => {
      //store the payload passed from the server from the axios call and insert it along
      //with the image-file, api key, and timestamp into a new form using new FormData()
      let formData = new FormData();
      formData.append("signature", response.data.signature);
      formData.append("api_key", "338231278645355");
      formData.append("timestamp", response.data.timestamp);
      formData.append("file", file[0]);
      setLoading(true);

   
      Axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
        console.log(response.data)
        //once an image is uploaded, cloundinary will send a response back with a secure url.
        setUploadedImage(response.data.secure_url);
      }).catch(err => {
        console.log("image did not upload", err)
      })
    }) 
}

function saveImageToDB(){
  Axios.post('/api/image', uploadedImage) 
}


  return (
    <div className={className}>
      <div>
        <div>
          <img src={profile_pic} />
          <input type="file" onChange={(e) => handleImageUpload(e.target.files)}/>
          {/* <button onClick={() => }>Apply</button> */}
        </div>
        <div>
          <input placeholder={first} onChange={e => setFirst(e.target.value)} />
          <input placeholder={last} onChange={e => setLast(e.target.value)} />
        </div>
        <div>
          {title}
          <input placeholder={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>

          <div>{email}</div>
        </div>
        <div>
          <input
            placeholder={linkedin}
            onChange={e => setLinked(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder={portfolio}
            onChange={e => setPortfolio(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => finished()}>Finished Editing</button>
       

    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(EditProfile);
