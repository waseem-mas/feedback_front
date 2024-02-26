import * as yup from 'yup'

export const feedBackSchema = yup.object().shape({
    title : yup.string().required('Required'),
    category : yup.string().required('Required'),
    description : yup.string().required('Required')
});