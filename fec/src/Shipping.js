import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Shipping({ slide, setSlide }) {
  const [shippingInfo, setShippingInfo] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  function firstNameOnChange(event) {
    event.preventDefault();
    setFirstName(event.target.value);
    document.getElementById('first-name').classList.remove("required-input");
    document.getElementById('first-name-validation').classList.add("hidden");
  }

  function lastNameOnChange(event) {
    event.preventDefault();
    setLastName(event.target.value);
    document.getElementById('last-name').classList.remove("required-input");
    document.getElementById('last-name-validation').classList.add("hidden");
  }

  function emailOnChange(event) {
    event.preventDefault();
    setEmail(event.target.value);
    document.getElementById('email').classList.remove("required-input");
    document.getElementById('email-validation').classList.add("hidden");
  }

  function phoneNumberOnChange(event) {
    event.preventDefault();
    setPhoneNumber(event.target.value);
    document.getElementById('phone-number').classList.remove("required-input");
    document.getElementById('phone-number-validation').classList.add("hidden");
  }

  function address1OnChange(event) {
    event.preventDefault();
    setAddress1(event.target.value);
    document.getElementById('address-1').classList.remove("required-input");
    document.getElementById('address-1-validation').classList.add("hidden");
  }

  function address2OnChange(event) {
    event.preventDefault();
    setAddress2(event.target.value);
  }

  function cityOnChange(event) {
    event.preventDefault();
    setCity(event.target.value);
    document.getElementById('city').classList.remove("required-input");
    document.getElementById('city-validation').classList.add("hidden");
  }

  function stateOnChange(event) {
    event.preventDefault();
    setState(event.target.value);
    document.getElementById('state').classList.remove("required-input");
    document.getElementById('state-validation').classList.add("hidden");
  }

  function zipCodeOnChange(event) {
    event.preventDefault();
    setZipCode(event.target.value);
    document.getElementById('zip-code').classList.remove("required-input");
    document.getElementById('zip-code-validation').classList.add("hidden");
  }

  function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(input_str);
  }

  function saveShippingInfo(event) {
    setShippingInfo({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zipCode: zipCode
    });

    if (firstName === '') {
      document.getElementById('first-name').classList.add("required-input");
      document.getElementById('first-name-validation').classList.remove("hidden");
    }
    if (lastName === '') {
      document.getElementById('last-name-validation').classList.remove("hidden");
      document.getElementById('last-name').classList.add("required-input");
    }
    if (email === '' || email.indexOf('@') === -1) {
      document.getElementById('email-validation').classList.remove("hidden");
      document.getElementById('email').classList.add("required-input");
    }
    if (!validatePhoneNumber(phoneNumber)) {
      document.getElementById('phone-number-validation').classList.remove("hidden");
      document.getElementById('phone-number').classList.add("required-input");
    }
    if (address1 === '') {
      document.getElementById('address-1').classList.add("required-input");
      document.getElementById('address-1-validation').classList.remove("hidden");
    }
    if (city === '') {
      document.getElementById('city').classList.add("required-input");
      document.getElementById('city-validation').classList.remove("hidden");
    }
    if (state === '') {
      document.getElementById('state').classList.add("required-input");
      document.getElementById('state-validation').classList.remove("hidden");
    }
    if (zipCode === '') {
      document.getElementById('zip-code').classList.add("required-input");
      document.getElementById('zip-code-validation').classList.remove("hidden");
    }

    else {
      axios.post('http://localhost:3002/customer', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipCode: zipCode
      })
        .then((response) => {
          console.log(response)
        })
      setSlide(slide + 1);
    }
  }

  return (
    <div>
      <div className="checkout-tracker">
        <div>
          <div className="number current">1</div>
          <div>Shipping Details</div>
        </div>
        <div className="stage">
          <div className="number">2</div>
          <div>Payment and Billing</div>
        </div>
        <div className="stage">
          <div className="number">3</div>
          <div>Review and Place Order</div>
        </div>
      </div>
      <form className="billing-information">
        <div className="billing-row">
          <label>
            First Name:
            <input type="text" id="first-name" name="first-name" onChange={firstNameOnChange} />
            <div id="first-name-validation" className="required hidden">FIRST NAME REQUIRED</div>
          </label>
          <label>
            Last Name:
            <input type="text" id="last-name" name="last-name" onChange={lastNameOnChange} />
            <div id="last-name-validation" className="required hidden">LAST NAME REQUIRED</div>
          </label>
        </div>
        <div className="billing-row">
          <label>
            Email:
            <input type="text" id="email" name="email" onChange={emailOnChange} />
            <div id="email-validation" className="required hidden">EMAIL REQUIRED</div>
          </label>
          <label>
            Phone Number:
            <input type="text" id="phone-number" name="phone-number" onChange={phoneNumberOnChange} />
            <div id="phone-number-validation" className="required hidden">PHONE NUMBER REQUIRED</div>
          </label>
        </div>
        <div className="billing-row">
          <label className="address">
            Address Line 1:
            <input type="text" id="address-1" name="address-1" onChange={address1OnChange} />
            <div id="address-1-validation" className="required hidden">ADDRESS REQUIRED</div>
          </label>
        </div>
        <div className="billing-row">
          <label>
            Address Line 2 (optional):
            <input type="text" id="address-2" name="address-2" onChange={address2OnChange} />
          </label>
          <label>
            City:
            <input type="text" id="city" name="city" onChange={cityOnChange} />
            <div id="city-validation" className="required hidden">CITY REQUIRED</div>
          </label>
        </div>
        <div className="billing-row">
          <label>
            State:
            <input type="text" id="state" name="state" onChange={stateOnChange} />
            <div id="state-validation" className="required hidden">STATE REQUIRED</div>
          </label>
          <label>
            Zip Code:
            <input type="text" id="zip-code" name="zip-code" onChange={zipCodeOnChange} />
            <div id="zip-code-validation" className="required hidden">ZIP CODE REQUIRED</div>
          </label>
        </div>
      </form>
      <div className="billing-buttons">
        <div className="checkout-button" onClick={() => { setSlide(slide - 1) }}>Return to Cart</div>
        <div className="checkout-button" onClick={saveShippingInfo}>Continue</div>
      </div>
    </div>
  )
}

export default Shipping