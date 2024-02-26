import { Link } from "react-router-dom"
import { useFormik,FormikHelpers } from 'formik';
import { signInSchema } from "../../validationSchemas/signInSchema";
import { ISignIn } from "../../interfaces/formikForms";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { login } from "../../store/auth/auth.action";
import { STATUS_CODE } from "../../constant";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {

const dispatch = useAppDispatch();
const [message , setMessage] = useState('')
const navigate = useNavigate();

const onSubmit = (values:ISignIn , actions:FormikHelpers<ISignIn>) => {
    dispatch(login({
        email: values.email,
        password: values.password
      })).then((resp : any) => {
        const { outcomeCode,message } = resp.payload?._metadata;
        if (outcomeCode === STATUS_CODE.OK){
            return navigate("/dashboard");
        }
      });
}
const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema : signInSchema,
    onSubmit
  });

  return (
    <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
        <div className="w-50 p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
            <h3 className="text-center">Sign In</h3>
            {message != '' && <p className="alert alert-danger">{message}</p>}
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email" 
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
                    id="password"
                    type="password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Password" 
                    className="form-control" />
                    {errors.password && touched.password && <p className="alert alert-danger">{errors.password}</p>}
            </div>
            <div className="d-grid">
                <button className="btn btn-primary"> Sign In</button>
            </div>
            <p className="text-end mt-2">
                <Link to='/signup' className="ms-2">Sign UP</Link>
            </p>
        </form>
        </div>
    </div>
  )
}

export default Login
