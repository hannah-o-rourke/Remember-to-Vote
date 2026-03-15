import { SetStateAction, Dispatch } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface formProps {
  // TODO: may delete this eventually.
  setFormSubmittedState: Dispatch<
    SetStateAction<{ formSubmitted: boolean; numberSubmitted: string }>
  >;
  formSubmissionState: {
    formSubmitted: boolean;
    numberSubmitted: string;
  };
}

// Waiting on Joe's design thoughts.
export default function SubmittedForm({ setFormSubmittedState, formSubmissionState }: formProps) {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Submitted</Alert.Heading>
        <br />
        <p>
          Thank you for submitting your form, you will now recieve a text on polling day - reminding you to vote!
          <br />
          <br />
        </p>
        <hr />
        <p>
          {' '}
        </p>
      </Alert>
      <Button
        variant="secondary soft"
        // id="submit-form-btn"
        // className="submitEnabled"
        onClick={() => setFormSubmittedState({ formSubmitted: false, numberSubmitted: '' })}
      >
        Go Back
      </Button>
    </>
  );
}
