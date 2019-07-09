import React from 'react'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function RegisterForm(formikProps) {
    const {errors, touched} = formikProps

    // below is the form setup
    return (
        <Form>
            <div>
                <h1>Register Today</h1>
            </div>
            <div>
                {touched.first && errors.first && <p>First Name is Required</p> } 
                <Field type='text' name='first' placeholder='First Name' />
            </div>
            <div>
                {touched.last && errors.last && <p>Last Name is Required</p> }
                <Field type='text' name='last' placeholder='Last Name' />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p> }
                <Field type='email' name='email' placeholder='Email' />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p> }
                <Field type='password' name='password' placeholder='Password' />
            </div>
            <Field component='select' name='isDeveloper'>
                <option value='developer'>Developer</option>
                <option value='recruiter'>Recruiter</option>
            </Field>
            <button>Submit</button>
        </Form>
    )
}


// high-order function 'Formik' that will get the values that user inputs on form
const Formik = withFormik({
    mapPropsToValues(props){
        const {email, password, first, last, isDeveloper} = props
        console.log(props)
        return {
            first: first || '',
            last: last || '',
            email: email || '',
            password: password || '',
            isDeveloper: isDeveloper || ''
        }
    },

    // validates if the data the user inputs is good 
    validationSchema: Yup.object().shape({
        first: Yup.string().required(),
        last: Yup.string().required(),
        email: Yup.string().email().required('Email Is Required'),
        password: Yup.string().min(8, "Password must be at least 8 characters").required('Password Is Required')
    }),

    handleSubmit(values, {resetForm}){
        
        const {first, last, email, password, isDeveloper} = values

        // Below it checks if the user selected 'developer' or 'recruiter' and sets developer to t or f
        let developer
        if(isDeveloper == 'developer'){
            developer = 't'
        } else {
            developer = 'f'
        }



        axios.post('/api/register', {first, last, developer, email, password})
        .then(res => {
            console.log(res.data)
            if(res.data == "Email already exists!"){
                alert("Email already exists!")
            }
            resetForm()
        })
        .catch(err => {
            console.log('this is the error', err)
        })
        console.log(developer)
        
    }
});

export default Formik(RegisterForm)
