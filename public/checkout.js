(() => {
  var form = document.getElementById("card-form");
  var clear = document.getElementById("clear");
  var id = "your-checkout-id";
  // Create custom style config to pass into Worldpay.checkout.init()
  var styles = {
    input: {
      "font-size": "14px",
      "font-family": "Arial"
    },
    "input.is-valid": {
      color: "green"
    },
    "input.is-invalid": {
      color: "red"
    }
  };
  var fields = {
    pan: {
      selector: "#card-pan",
      placeholder: "Card number"
    },
    expiry: {
      selector: "#card-expiry",
      placeholder: "MM/YY"
    },
    cvv: {
      selector: "#card-cvv",
      placeholder: "CVV"
    }
  };
  // Create accessibility config to pass into Worldpay.checkout.init()
  var accessibility = {
    ariaLabel: {
      pan: "my custom aria label for pan input",
      expiry: "my custom aria label for expiry input",
      cvv: "my custom aria label for cvv input"
    },
    lang: {
      locale: "en-GB"
    },
    title: {
      enabled: true,
      pan: "my custom title for pan",
      expiry: "my custom title for expiry date",
      cvv: "my custom title for security code"
    }
  };
  // Create card brand configuration to control which card brands you accept
  var acceptedCardBrands = ["amex", "diners", "discover", "jcb", "maestro", "mastercard", "visa"];

  Worldpay.checkout.init(
    {
      id: id,
      styles: styles,
      form: "#card-form",
      fields: fields,
      accessibility: accessibility,
      acceptedCardBrands: acceptedCardBrands
    },
    function (err, checkout) {
      if (err) {
        // handle init error
        console.info(err);
        return;
      }
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        checkout.generateSessions(function (err, sessions) {
          if (err) {
            // handle session state generation error
            console.info(err);
            console.log("error at generate session")
            console.log(sessions);
            return;
          }
          // send sessions to the server
          console.log('Sessions Card : ' + sessions.card + ', Sessions CVV : ' + sessions.cvv);
        });
      });

      clear.addEventListener("click", function (event) {
        event.preventDefault();
        checkout.clearForm(function () {
          // trigger desired behaviour on cleared form
          console.log('Form successfully cleared');
        });
      });
    }
  );
})();