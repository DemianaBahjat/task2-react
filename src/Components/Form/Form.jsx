import React, { useState } from 'react'
import './Form.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-bootstrap/Spinner';
export default function Form() {

    const [ErrorMessage, setErrorMsg]= useState(false)
    const [islogin , setIsLogin] =useState('')
    const [isLoading, setIsLoading]= useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    }

  const validationSchema= Yup.object({
    email:Yup.string().required('email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'email example@ggg.com '),
    password:Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'min length 8 , must contains at least 1 uppercase , 1 lowercase, 1 symbol and 1 number')
  })
  const{values, handleBlur, handleChange, handleSubmit, touched,errors}  =useFormik({

    initialValues:{
        email:'',
        password:''

    },
     validationSchema,
     onSubmit:(()=>{
       setIsLogin('you are logged in')
     })
    })

  return (
    <>
         <div className='container'>
         <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="email" class="form-label">Email address</label>
                <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                 type="email" 
                 class="form-control" 
                 name="email" 
                 id="email" />
                 {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}
             </div>
            <div class="mb-3">
               <label htmlFor="password" class="form-label">Password</label>
              <input 
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? 'text' : 'password'}
              class="form-control" 
              id="password" 
              name='password'/>
              {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}
              <button type="button" onClick={toggleShowPassword} className='btn btn-primary mt-2'>
                  {showPassword ? 'Hide' : 'Show'} Password
              </button>
           </div>
          {isLoading?
               <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
              </Spinner>
             : 
                <button type="submit" class="btn btn-primary">Submit</button>
           }
          {ErrorMessage&& <p className='alert alert-danger m-3'>{'account is already exists'}</p>}
          {islogin? <p className='alert alert-success m-3 p-2'>{islogin}</p>:null}
         </form>
         </div>

    </>
  )
}
