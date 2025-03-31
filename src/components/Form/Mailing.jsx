import React, { useContext, useState } from 'react'
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { ErrorMessage, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import showToast from '../ToastMessage/showToast';
import { postUserFn } from '../../api/ApiHandler';
import MultiStepFormContext from './MultiStepFormContext';

const Mailing = () => {
     const navigate = useNavigate();
     const [isSubmitting, setIsSubmitting] = useState(false);
     const { mail, prev, details, employee } = useContext(MultiStepFormContext);
     const validationSchema = yup.object({
          province: yup
               .string()
               .required("Company name is required"),

          district: yup
               .string()
               .required("Address is required"),

          municipality: yup
               .string()
               .required("Job Title is required"),

          street: yup
               .string()
     })
     
     const handleSubmit = async (values) => {
          setIsSubmitting(true);
          try {
               await postUserFn({ ...details, ...employee, ...values });
               navigate('/user');
               showToast('success', 'form submitted successfully!');
          }
          catch (error) {
               console.log(error);
               showToast('error', 'User Cannot be Added')
          }
          finally {
               setIsSubmitting(false);
          }
     }
     return (
          <Formik
               initialValues={{ ...mail }}
               onSubmit={async (values) => {

                    await handleSubmit(values);
               }}
               validationSchema={validationSchema}
          >
               {({ handleSubmit, errors, values, touched, handleChange }) =>
               (
                    <form onSubmit={handleSubmit} className='mt-20 mx-15'>
                         <div className='flex flex-col gap-10 mb-26'>
                              <div className='flex gap-20'>

                                   <FormControl error={Boolean(touched.province && errors.province)} className='w-full'>
                                        <TextField id="province" label="Province" variant="outlined" name='province' value={values.province} onChange={handleChange} required />
                                        <ErrorMessage name='province' component={FormHelperText} />
                                   </FormControl>
                                   <FormControl error={Boolean(touched.district && errors.district)} className='w-full'>
                                        <TextField id="district" label="District" variant="outlined" name='district' value={values.district} onChange={handleChange} />
                                        <ErrorMessage name='district' component={FormHelperText} />
                                   </FormControl>
                              </div>
                              <FormControl error={Boolean(touched.municipality && errors.municipality)} className='w-full'>
                                   <TextField id="municipality" label="Municipality" variant="outlined" name='municipality' value={values.municipality} onChange={handleChange} required />
                                   <ErrorMessage name='municipality' component={FormHelperText} />
                              </FormControl>
                              <FormControl error={Boolean(touched.street && errors.street)} className='w-full'>
                                   <TextField id="street" label="Street" variant="outlined" name='street' value={values.street} onChange={handleChange} />
                                   <ErrorMessage name='street' component={FormHelperText} />
                              </FormControl>
                         </div>

                         <div className='flex justify-between'>
                              <Button variant="contained" onClick={prev}>
                                   Back
                              </Button>
                              <Button type='submit' variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
                                   Submit
                              </Button>
                         </div>
                    </form>
               )
               }
          </Formik>
     )
}

export default Mailing
