import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import { StepIconProps } from "@material-ui/core/StepIcon";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import "./FormDisplay.css";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import {
  Formik,
  Form,
  Field,
  FormikConfig,
  FormikValues,
  useFormikContext,
} from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import Byeby from "./Byeby";

const FormDisplay = () => {
  const [done, setDone] = useState(false);
  const [input, setInput] = useState<FormikValues | undefined>();

  if (!done) {
    return (
      <div className="container">
        <Card>
          <CardContent>
            <FormikStepper
              initialValues={{
                firstName: "",
                lastName: "",
                age: "",
                email: "",
                password: "",
                Subject: [],
              }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                console.log(values, "val");
                setInput(values);
                setDone(true);
              }}
            >
              <FormikStep
                validationSchema={yup.object({
                  firstName: yup
                    .string()
                    .required()
                    .min(8, "minimun 8 characters required"),
                  lastName: yup
                    .string()
                    .required()
                    .min(8, "minimun 8 characters required"),
                  age: yup.number().required(),
                  // email: yup.string().email().required(),
                  // password: yup.mixed().required(),
                })}
                label="Personal Info"
              >
                <div className="account">
                  <Box paddingBottom={3}>
                    <Field
                      fullWidth
                      name="firstName"
                      component={TextField}
                      label="First Name"
                    />
                  </Box>
                </div>
                <div className="account">
                  <Box className="first" paddingBottom={3}>
                    <Field
                      fullWidth
                      name="lastName"
                      component={TextField}
                      label="Last Name"
                    />
                  </Box>
                </div>
                <div className="account">
                  <Box className="first" paddingBottom={3}>
                    <Field
                      fullWidth
                      name="age"
                      component={TextField}
                      label="age"
                      type="number"
                    />
                  </Box>
                </div>
              </FormikStep>

              <FormikStep
                validationSchema={yup.object({
                  email: yup.string().email().required(),
                  password: yup
                    .string()
                    .required()
                    .min(8, "minimun 8 characters required"),
                })}
                label="Account Setup"
              >
                <ComponentToShowFullName />
                <div className="account">
                  <Field
                    fullWidth
                    name="email"
                    component={TextField}
                    label="email"
                    type="email"
                  />
                </div>
                <div className="account">
                  <Field
                    fullWidth
                    name="password"
                    component={TextField}
                    label="Password"
                  />
                </div>
              </FormikStep>
              <FormikStep
                validationSchema={yup.object({
                  Subject: yup
                    .array()
                    .required("This field is required.")
                    .min(1, "Pick at least 1 item"),
                })}
                label="Course type"
              >
                <ComponentToShowFullName />
                <br />
                <label>
                  <Field type="checkbox" name="Subject" value="English" />
                  English
                </label>
                <br />
                <label>
                  <Field type="checkbox" name="Subject" value="Math" />
                  Math
                </label>
                <br />
                <label>
                  <Field type="checkbox" name="Subject" value="Computer" />
                  Computer
                </label>{" "}
                <br />
                <p>Select atleast one</p>
              </FormikStep>

              <FormikStep label="Confirmation">
                <ComponentToShowFullName />
                <div>
                  <ComponenetToConfirm />
                </div>
              </FormikStep>
              <FormikStep label="done">
                <ComponentToShowFullName />
                <div>
                  <Field
                    name="password"
                    type="password"
                    component={TextField}
                    label="Password"
                  />
                </div>
              </FormikStep>
            </FormikStepper>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <>
      <Byeby data={input} />
    </>
  );
};

export default FormDisplay;

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export const FormikStep = ({ children }: FormikStepProps) => {
  return <>{children}</>;
};

export const FormikStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;
  const isLastStep = () => {
    return step === childrenArray.length - 2;
  };

  const [completed, setCompleted] = useState(false);
  // ----------------------------------

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 50,
      height: 50,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    },
  });

  function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
      4: <CloudDoneIcon />,
      5: <DoneAllIcon />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  {
    console.log("scema", currentChild.props.validationSchema);
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, ind) => (
              <Step key={child.props.label} completed={step > ind || completed}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {child.props.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="form">
            {currentChild}
            {step > 0 ? (
              <Button
                disabled={isSubmitting}
                variant="contained"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
            ) : null}
            <Button
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
              type="submit"
            >
              {isSubmitting ? "Submtting" : isLastStep() ? "Submit" : "Next"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
function ComponentToShowFullName() {
  const formikContext = useFormikContext<{
    firstName: string;
    lastName: string;
    age: string | number;
    email: string;
    password: string;
  }>();

  return (
    <>
      Hello,{" "}
      {formikContext.values.firstName + " " + formikContext.values.lastName}!
    </>
  );
}
function ComponenetToConfirm() {
  const formikContext = useFormikContext<{
    firstName: string;
    lastName: string;
    age: string | number;
    email: string;
    password: string;
  }>();

  return (
    <>
      you entered first name: {formikContext.values.firstName}
      last name: {formikContext.values.lastName}
    </>
  );
}
