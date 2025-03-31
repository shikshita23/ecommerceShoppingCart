import React, { useContext } from 'react'
import * as yup from 'yup';
import MultiStepFormContext from './MultiStepFormContext';

import { Button, FormControl, FormHelperText, MenuItem, TextField } from '@mui/material';
import { ErrorMessage, Formik } from 'formik';
const PersonalInformation = () => {
     const { details, setDetails, next } = useContext(MultiStepFormContext);

     const validationSchema = yup.object({
          firstName: yup
               .string()
               .required("First name is required"),

          middleName: yup
               .string(),

          lastName: yup
               .string()
               .required("Last name is required"),

          age: yup
               .number(),

          gender: yup
               .string()
               .required("Geder is required"),

          phoneNumber: yup
               .string()
               .required("Phone number is required")
               .matches(/^(98|97)\d{8}$/, "Invalid Phone number")
     })
     return (
          <Formik
               initialValues={{ ...details }}
               onSubmit={(values) => {
                    console.log("personal", values)
                    setDetails(values)
                    next();
               }}
               validationSchema={validationSchema}
          >
               {({ handleSubmit, errors, values, touched, handleChange }) =>
               (
                    <form onSubmit={handleSubmit} className='mt-20 mx-15'>
                         <div className='flex justify-between'>
                              <FormControl error={Boolean(touched.firstName && errors.firstName)} className='w-82'>
                                   <TextField id="firstName" label="First Name" variant="outlined" name='firstName' value={values.firstName} onChange={handleChange} required />
                                   <ErrorMessage name='firstName' component={FormHelperText} />
                              </FormControl>
                              <FormControl error={Boolean(touched.middleName && errors.middleName)} className='w-82'>
                                   <TextField id="middleName" label="Middle Name" variant="outlined" name='middleName' value={values.middleName} onChange={handleChange} />
                                   <ErrorMessage name='middleName' component={FormHelperText} />
                              </FormControl>
                              <FormControl error={Boolean(touched.lastName && errors.lastName)} className='w-82'>
                                   <TextField id="lastName" label="Last Name" variant="outlined" name='lastName' value={values.lastName} onChange={handleChange} required />
                                   <ErrorMessage name='lastName' component={FormHelperText} />
                              </FormControl>
                         </div>
                         <div className='mt-7'>
                              <FormControl error={Boolean(touched.age && errors.age)} className='w-82'>
                                   <TextField id="age" label="Age" variant="outlined" name='age' value={values.age} onChange={handleChange} required />
                                   <ErrorMessage name='age' component={FormHelperText} />
                              </FormControl>
                         </div>
                         <div className='mt-7'>
                              <FormControl error={Boolean(touched.gender && errors.gender)} className='w-82'>
                                   <TextField select id="gender" label="Gender" variant="outlined" name='gender' value={values.gender} onChange={handleChange} required  >
                                        <MenuItem disabled value="">select Gender</MenuItem>
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                   </TextField>
                                   <ErrorMessage name='gender' component={FormHelperText} />
                              </FormControl>
                         </div>
                         <div className='my-7'>
                              <FormControl error={Boolean(touched.phoneNumber && errors.phoneNumer)} className='w-82'>
                                   <TextField id="phoneNumer" label="Phone Number" variant="outlined" name='phoneNumber' value={values.phoneNumber} onChange={handleChange} />
                                   <ErrorMessage name='phoneNumber' component={FormHelperText} />
                              </FormControl>
                         </div>
                         <div className='flex justify-end'>
                              <Button variant="contained" onClick={handleSubmit}>
                                   Next
                              </Button>
                         </div>
                    </form>
               )
               }
          </Formik>
     )
}

export default PersonalInformation
