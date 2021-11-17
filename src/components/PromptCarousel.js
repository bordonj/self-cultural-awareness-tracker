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

const PromptCarousel = () => {
  const  { docs, loading } = useFetchLessons('prompts');
  console.log(docs)
  console.log(loading)

  useEffect(() => {
  }, [docs])

  const showCarousel = () => {
    console.log('1 show carousel')
    if (docs) {
      return (
        <>
        <Carousel>

        { docs[2].prompts.map((prompt, idx) => {
          return (
            <Carousel.Item key={idx}>
              {console.log('INSIDE SHOWCAROUSEL', prompt)}
                <img
                  className="d-block w-100"
                  src='https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>{prompt}</h5>
                  <p>Prompt {idx + 1}</p>
                </Carousel.Caption>
              </Carousel.Item>
          )
        })}
        </Carousel>
      </>
      )
    }
  };

  const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];
  

  function TextMobileStepper() {
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
              <Typography>Having difficulty thinking? Pick a prompt.</Typography>
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
        {/* { docs && docs[2].prompts.map((prompt, idx) => (
          <Carousel.Item key={idx}>
            {console.log('prompt', prompt)}
              <img
                className="d-block w-100"
                src='https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt="First slide"
              />
              <Carousel.Caption>
                <h5>{prompt}</h5>
                <p>Prompt {idx + 1}</p>
              </Carousel.Caption>
            </Carousel.Item>
        ))} */}
        {showCarousel()}
        {TextMobileStepper()}
  </>
  );
}

export default PromptCarousel;