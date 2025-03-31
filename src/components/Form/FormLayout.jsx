import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import PersonalInformation from './PersonalInformation';
import Mailing from './Mailing';
import Employee from './Employee';
import { Provider } from './MultiStepFormContext'

const detailsInitialState = {
  firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      gender: "",
      phoneNumber: "",
};
const employeeInititalState = {
  companyName: "",
  companyAddress: "",
  jobTitle: "",
};
const mailingInitialState = {
  province: "",
  district: "",
  municipality: "",
  street: "",
};

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <PersonalInformation />;
    case 1:
      return <Employee />;
    case 2:
      return <Mailing />;
    default:
      return null;
  }
};

const FormLayout = () => {
  const [details, setDetails] = useState(detailsInitialState);
  const [employee, setEmployee] = useState(employeeInititalState);
  const [mail, setMail] = useState(mailingInitialState);
  const [activeStep, setActiveStep] = useState(0);
  
  const next = () => {
    if (activeStep === 2) {
      setActiveStep(0);
      setDetails(detailsInitialState);
      setEmployee(employeeInititalState);
      setMail(mailingInitialState);
      return;
    }
    setActiveStep(activeStep + 1);
  };
  const prev = () => setActiveStep(activeStep - 1);

  return (
    <Box sx={{ width: '100%', paddingY:'50px', paddingX:'50px'}} >
    <Provider value={{ details, setDetails, next, prev, mail, setMail, employee,setEmployee }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '800px' }}>
        <Stepper activeStep={activeStep}>
            <Step><StepLabel>Personal Details</StepLabel></Step>
            <Step><StepLabel>Employee</StepLabel></Step>
            <Step><StepLabel>Mailing</StepLabel></Step>
           
          </Stepper>
        </div>
      </div>
      <main style={{ marginTop: '50px' }}>{renderStep(activeStep)}</main>
    </Provider>
  </Box>
  )
}

export default FormLayout

