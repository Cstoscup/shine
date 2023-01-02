import React from 'react'

function Payment({slide, setSlide}) {
  return (
    <div>
      <div className="checkout-tracker">
          <div className="stage">
            <div className="number"><i class="fa-solid fa-check"></i></div>
            <div>Shipping Details</div>
          </div>
          <div>
            <div className="number current">2</div>
            <div>Payment and Billing</div>
          </div>
          <div className="stage">
            <div className="number">3</div>
            <div>Review and Place Order</div>
          </div>
        </div>
        <form className="billing-information">
          <label>
              Credit Card Number:
              <input type="text" id="card-number" name="card-number" />
              <div id="card-number-validation" className="required hidden">CREDIT CARD NUMBER REQUIRED</div>
            </label>
            <label>
              Expiration Date:
              <input type="text" id="expiration-date" name="expiration-date" />
              <div id="expiration-date-validation" className="required hidden">EXPIRATION DATE REQUIRED</div>
            </label>
            <label>
              Security Code:
              <input type="text" id="security-code" name="security-code" />
              <div id="security-code-validation" className="required hidden">SECURITY CODE REQUIRED</div>
            </label>
        </form>
        <div className="billing-buttons">
          <div className="checkout-button" onClick={() => { setSlide(slide - 1) }}>Return to Shipping Details</div>
          <div className="checkout-button" onClick={() => { setSlide(slide + 1) }}>Continue</div>
        </div>
    </div>
  )
}

export default Payment