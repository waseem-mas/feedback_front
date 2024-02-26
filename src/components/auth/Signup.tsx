import { Link } from "react-router-dom"
import { useFormik,FormikHelpers } from 'formik';
import { signUpSchema } from "../../validationSchemas/signUpSchema";
import { ISignUp } from "../../interfaces/formikForms";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { signup } from "../../store/auth/auth.action";
import { STATUS_CODE } from "../../constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

const dispatch = useAppDispatch();
const [message , setMessage] = useState('')
const navigate = useNavigate();

const onSubmit = (values:ISignUp , actions:FormikHelpers<ISignUp>) => {
    const {first_name,last_name,email,password,confirm_password} = values
    dispatch(signup({
      first_name,last_name,email,password,confirm_password
    })).then((resp : any) => {
      const { outcomeCode,message } = resp.payload?._metadata;
      const {password} = resp.payload?.errors
      if (outcomeCode === STATUS_CODE.Unprocessable_Entity){
        const signup_errors = password.map((p : any) => <li>{p}</li>);
          setMessage(signup_errors)
      }else{
        return navigate("/dashboard");
      }
    });
}
const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues: {
      first_name : '',
      last_name : '',
      email: '',
      password: '',
      confirm_password : ''
    },
    validationSchema : signUpSchema,
    onSubmit
  });

  return (
    <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
        <div className="w-50 p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
            <h3 className="text-center">Sign Up</h3>
            <p className="alert alert-danger">{message}</p>
            <div className="mb-2">
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text"
                    id="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter First Name" 
                    className={errors?.first_name && touched.first_name ? 'form-control input-error' : 'form-control'} />
                    {errors.first_name && touched.first_name && <p className="alert alert-danger">{errors.first_name}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text" 
                    id="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Last Name" 
                    className={errors?.last_name && touched.last_name ? 'form-control input-error' : 'form-control'} />
                    {errors.last_name && touched.last_name && <p className="alert alert-danger">{errors.last_name}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Email" 
                    className={errors?.email && touched.email ? 'form-control input-error' : 'form-control'} />
                    {errors.email && touched.email && <p className="alert alert-danger">{errors.email}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Password" 
                    className={errors?.password && touched.password ? 'form-control input-error' : 'form-control'} />
                    {errors.password && touched.password && <p className="alert alert-danger">{errors.password}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Confirm Password" 
                    className={errors?.confirm_password && touched.confirm_password ? 'form-control input-error' : 'form-control'} />
                    {errors.confirm_password && touched.confirm_password && <p className="alert alert-danger">{errors.confirm_password}</p>}
            </div>
            <div className="d-grid">
                <button className="btn btn-primary"> Sign Up</button>
            </div>
            <p className="text-end mt-2">
                <Link to='/' className="ms-2">Sign In</Link>
            </p>
        </form>
        </div>
    </div>
  )
}

export default Signup
