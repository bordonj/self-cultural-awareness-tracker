import { useState } from "react";
import { useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import useFetchLessons from "../hooks/useFetchLessons";

import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import Collapse from '@material-ui/core/Collapse';
import { Collapse } from "@mui/material";

const PromptCarousel = () => {
  const  { docs, loading } = useFetchLessons('prompts');
  console.log(docs)
  console.log(loading)

  const Prompts = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <div>
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={() => {
            setIsChecked((prev) => !prev);
          }} />}
          label="Having difficulty thinking? Toggle to show prompts."
        />
        <div style={{ }}>
          <Collapse in={isChecked}>
            <Paper
              elevation={5}
              style={{ width: '100%'}} >
              {TextMobileStepper()}
            </Paper>
          </Collapse>
        </div>
      </div>
    );
  }

  const TextMobileStepper = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = docs ? docs[2].prompts.length : 0;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    if (docs) {
        return (
          <Box sx={{ width: '100%', flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 50,
                pl: 2,
                bgcolor: 'background.default',
              }}
            >
              <Typography style={{margin: 'auto', width: '100%'}}>Prompts</Typography>
            </Paper>
            <Box sx={{ height: 255, width: '100%', p: 2 }}>
              {console.log('active step', activeStep)}
              {console.log(docs[2].prompts)}
              {docs[2].prompts[activeStep]}
            </Box>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        );

    }
  }

  return (  
    <>
        { loading &&
          <div className="spinner-parent"> 
            <Spinner animation="border" role="status" id="spinner">
              <span className="visually-hidden"></span>
            </Spinner>
          </div>
        }
        {Prompts()}
  </>
  );
}

export default PromptCarousel;