import { useFormik,FormikHelpers } from 'formik';
import { feedBackSchema } from '../../validationSchemas/feedBackSchema';
import { IFeedback } from '../../interfaces/formikForms';
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { PostFeedback } from "../../store/feedback/feedback.action";
import { STATUS_CODE } from "../../constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {

  const dispatch = useAppDispatch();
  const [message , setMessage] = useState('')
  const navigate = useNavigate();

    const onSubmit = (values:IFeedback , actions:FormikHelpers<IFeedback>) => {
      const {title,category,description} = values
      dispatch(PostFeedback({
        title,category,description
      })).then((resp : any) => {
        const { outcomeCode,message } = resp.payload?._metadata;
        const {category_id} = resp.payload?.errors
        if (outcomeCode === STATUS_CODE.Unprocessable_Entity){
          // Here i just consider category server side error, we can do same for other fields as well
          const category_errors = category_id.map((p : any) => <li>{p}</li>);
          setMessage(category_errors)
        }else{
          return navigate("/dashboard");
        }
      });
    }
    const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues: {
          title : '',
          category : '',
          description: '',
        },
        validationSchema : feedBackSchema,
        onSubmit
      });
  return (
    <div className='container-fluid bg-white mt-3'>
      <div className='row'>
        <div className='col'>
        <div className="p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
            <h3 className="text-center">Feedback</h3>
            <p className='alert alert-danger'>{message}</p>
            <div className="mb-2">
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter First Name" 
                    className={errors?.title && touched.title ? 'form-control input-error' : 'form-control'} />
                    {errors.title && touched.title && <p className="alert alert-danger">{errors.title}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="category">Category</label>
                <select className="form-select"
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                   <option selected>Bug</option>
                   <option value="1">Feature</option>
                   <option value="2">Improvment</option>
                </select>
                <textarea 
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Last Name" 
                    className={errors?.description && touched.description ? 'form-control input-error' : 'form-control'} ></textarea>
                    {errors.description && touched.description && <p className="alert alert-danger">{errors.description}</p>}
            </div>
            <div className="d-grid">
                <button className="btn btn-primary"> Sign Up</button>
            </div>
            <p className="text-end mt-2">
            </p>
        </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
