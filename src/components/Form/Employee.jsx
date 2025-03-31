import React, { useContext } from 'react'
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, MenuItem, TextField } from '@mui/material';
import { ErrorMessage, Formik } from 'formik';

import MultiStepFormContext from './MultiStepFormContext';
const Employee = () => {
  const { employee, setEmployee, next, prev } = useContext(MultiStepFormContext);

    const validationSchema=yup.object({
     companyName:yup
          .string()
          .required("Company name is required"),
     
          companyAddress:yup
          .string()
          .required("Address is required"),
     
          jobTitle:yup
          .string()
          .required("Job Title is required"),
    })

  return (
    <Formik
          initialValues={{...employee}}
          onSubmit={(values)=>{
               console.log("personal",values)
               setEmployee(values)
               next();
          }}
          validationSchema={validationSchema}
    >
     {({handleSubmit, errors, values,touched, handleChange})=>
          (
               <form onSubmit={handleSubmit} className='mt-20 mx-15'>
                    <div className='flex flex-col gap-10 mb-26'>
                         <FormControl  error={Boolean(touched.companyName && errors.companyName)} className='w-full'>
                              <TextField id="companyName" label="Company" variant="outlined" name='companyName' value={values.companyName} onChange={handleChange} required  />
                              <ErrorMessage name='companyName' component={FormHelperText}/>
                         </FormControl>
                         <FormControl  error={Boolean(touched.companyAddress && errors.companyAddress)} className='w-full'>
                              <TextField id="companyAddress" label="Address" variant="outlined" name='companyAddress' value={values.companyAddress} onChange={handleChange}   />
                              <ErrorMessage name='companyAddress' component={FormHelperText}/>
                         </FormControl>
                         <FormControl  error={Boolean(touched.jobTitle && errors.jobTitle)} className='w-full'>
                              <TextField id="jobTitle" label="Job Title" variant="outlined" name='jobTitle' value={values.jobTitle} onChange={handleChange} required  />
                              <ErrorMessage name='jobTitle' component={FormHelperText}/>
                         </FormControl>
                    </div>
                    
                    <div className='flex justify-between'>
                    <Button variant="contained" onClick={prev}>
                         Back
                    </Button>
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

export default Employee
