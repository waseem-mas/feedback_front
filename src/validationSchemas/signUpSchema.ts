import * as yup from 'yup'


export const signUpSchema = yup.object().shape({
    first_name : yup.string().required('Required'),
    last_name : yup.string().required('Required'),
    email : yup.string().email('Please enter correct email').required('Required'),
    password : yup.string().min(5).required('Required'),
    confirm_password : yup.string().oneOf([yup.ref('password')], "Passwords must match").required('Required')
});