import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short!')
    .max(15, 'Title is too long!')
    .required('Required Field'),
  description: Yup.string()
    .min(3, 'Description is too short!')
    .max(25, 'Description is too long!')
    .required('Required Field'),
  startDate: Yup.string().required('Required Field'),
  endDate: Yup.string().required('Required Field'),
  category: Yup.string().required('Required Field'),
});
export default taskSchema;
