import * as yup from 'yup'


export const signInSchema = yup.object().shape({
    email : yup.string().email('Please enter correct email').required('Required'),
    password : yup.string().min(5).required('Required')
});