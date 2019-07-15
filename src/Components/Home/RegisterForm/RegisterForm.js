import React from "react";
import { setUser } from "../../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import { FaCaretUp } from "react-icons/fa";
import * as Yup from "yup";
import axios from "axios";
import "./RegisterForm.scss";

let theProps;

function RegisterForm(formikProps) {
  const { errors, touched } = formikProps;
  // below is the form setup

  return (
    <Form className="form-container">
      <div className="input-box">
        <Field
          type="text"
          name="first"
          placeholder="First Name"
          className="input-field"
        />
        {touched.first && errors.first && (
          <div className="help-text">
            <div className="help-triangle">
              <FaCaretUp />
            </div>
            <p>First Name is Required</p>
          </div>
        )}
      </div>
      <div className="input-box">
        <Field
          type="text"
          name="last"
          placeholder="Last Name"
          className="input-field"
        />
        {touched.last && errors.last && (
          <div className="help-text">
            <div className="help-triangle">
              <FaCaretUp />
            </div>
            <p>Last Name is Required</p>
          </div>
        )}
      </div>
      <div className="input-box">
        <Field
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
        />
        {touched.email && errors.email && (
          <div className="help-text">
            <div className="help-triangle">
              <FaCaretUp />
            </div>
            <p>{errors.email}</p>
          </div>
        )}
      </div>
      <div className="input-box">
        <Field
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
        />
        {touched.password && errors.password && (
          <div className="help-text">
            <div className="help-triangle">
              <FaCaretUp />
            </div>
            <p>{errors.password}</p>
          </div>
        )}
      </div>
      <Field component="select" name="isDeveloper" className="select">
        <option>Select</option>
        <option value="developer">Developer</option>
        <option value="recruiter">Recruiter</option>
      </Field>
      <button className="submit-btn" type="submit">
        Join now
      </button>
    </Form>
  );
}

// high-order function 'Formik' that will get the values that user inputs on form
const Formik = withFormik({
  mapPropsToValues(props) {
    theProps = props;
    console.log(props);
    // const { email, password, first, last, isDeveloper } = props;
    // console.log(isDeveloper);
    return {
      first: "",
      last: "",
      email: "",
      password: "",
      isDeveloper: ""
    };
  },
  // validates if the data the user inputs is good
  validationSchema: Yup.object().shape({
    first: Yup.string().required(),
    last: Yup.string().required(),
    email: Yup.string()
      .email()
      .required("Email Is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password Is Required")
  }),

  handleSubmit(values, { resetForm }) {
    const { first, last, email, password, isDeveloper } = values;
    const default_pic =
      "https://www.uic.mx/posgrados/files/2018/05/default-user.png";
    console.log(isDeveloper);

    let developer;
    if (isDeveloper === "developer") {
      developer = "t";
    } else {
      developer = "f";
    }

    axios
      .post("/api/register", {
        first,
        last,
        developer,
        email,
        password,
        default_pic
      })
      .then(res => {
        let user_id = res.data.user_id
        if (res.data === "Email already exists!") {
          alert("Email already exists!");
        } else {
          theProps.setUser({ first, last, developer, email, default_pic, user_id  });
          resetForm();
        }
      })
      .catch(err => {
        console.log("this is the error", err);
      });
  }
});

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

export default invokedConnect(Formik(RegisterForm));
