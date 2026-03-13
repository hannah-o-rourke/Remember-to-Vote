import { useState, Dispatch, SetStateAction } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { Form as BForm } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxW71_uBWJQLAlrrFrtZRhunVrQ-31nb71WLDWhLoJFrLAbdTjBvf4dJsotNNbKlF674A/exec';

interface formProps {
  setFormSubmittedState: Dispatch<
    SetStateAction<{ formSubmitted: boolean; numberSubmitted: string }>
  >;
}

export interface formData {
  name: string;
  phone: string;
  postcode: string;
  messageType: string;
  addressSlug: string;
}

export default function Form({ setFormSubmittedState }: formProps) {
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isPostcodeValid, setIsPostcodeValid] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<formData>({
    name: '',
    phone: '',
    postcode: '',
    messageType: 'Sms',
    addressSlug: '',
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    if (!isNameValid && name === 'name') setIsNameValid(true);
    if (!isPostcodeValid && name === 'postcode') setIsPostcodeValid(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneInputChange = (phoneNumber: any) => {
    if (phoneNumber && isPossiblePhoneNumber(phoneNumber)) {
      setIsNumberValid(true);
    } else {
      setIsNumberValid(false);
    }
    setFormData((prev) => ({ ...prev, phone: phoneNumber }));
  };

  const canUserSubmit = isNameValid && isNumberValid && isPostcodeValid && !submitting;

  const handleSubmit = async () => {
    let valid = true;
    if (!formData.name) { setIsNameValid(false); valid = false; }
    if (!formData.phone || !isPossiblePhoneNumber(formData.phone)) { setIsNumberValid(false); valid = false; }
    if (!formData.postcode) { setIsPostcodeValid(false); valid = false; }
    if (!valid) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        postcode: formData.postcode,
        messageType: formData.messageType,
        addressSlug: formData.addressSlug,
      });

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      setFormSubmittedState({ formSubmitted: true, numberSubmitted: formData.phone });
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  const phoneNumberClassName = () => {
    const invalidClass =
      isNumberValid || (!isNumberValid && formData.phone === undefined) ? '' : ' is-invalid';
    return 'form-control' + invalidClass;
  };

  return (
    <BForm>
      Sign up to receive updates and reminders about upcoming elections.
      <br />
      <br />
      <BForm.Group className="form-margin-bottom" controlId="name">
        <BForm.Label>Name</BForm.Label>
        <BForm.Control
          type="text"
          placeholder="Jane Appleseed"
          name="name"
          className={isNameValid ? '' : 'is-invalid'}
          onChange={handleTextChange}
        />
        {!isNameValid && <div className="invalid-feedback">Please enter your name.</div>}
      </BForm.Group>

      <BForm.Group className="form-margin-bottom" controlId="phone">
        <BForm.Label>Phone number</BForm.Label>
        <PhoneInput
          style={{ '--PhoneInputCountryFlag-height': '20px' } as React.CSSProperties}
          defaultCountry="GB"
          onChange={handlePhoneInputChange}
          numberInputProps={{ className: phoneNumberClassName() }}
          placeholder="07700 900684"
        />
        {!isNumberValid && (
          <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
            Please enter a valid phone number.
          </div>
        )}
      </BForm.Group>

      <BForm.Group className="form-margin-bottom" controlId="postcode">
        <BForm.Label>Postcode</BForm.Label>
        <BForm.Control
          type="text"
          placeholder="SW1A 2AA"
          name="postcode"
          className={isPostcodeValid ? '' : 'is-invalid'}
          onChange={handleTextChange}
        />
        {!isPostcodeValid && <div className="invalid-feedback">Please enter your postcode.</div>}
      </BForm.Group>

      <BForm.Group>
        <div>
          <div className="d-grid">
            <Button
              size="lg"
              variant="success"
              id="submit-btn"
              style={{ textAlign: 'left' }}
              onClick={handleSubmit}
              disabled={!canUserSubmit}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            >
              {submitting ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
          <div>{submitError ? submitError : null}</div>
        </div>
      </BForm.Group>
    </BForm>
  );
}
