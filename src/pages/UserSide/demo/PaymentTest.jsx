import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
// import Razorpay from "razorpay";

function PaymentTest() {
  
  //  Razorpay

  const initiatePayment = () => {
    fetch("http://localhost:8082/therapists/api/v1/payments/stripe/checkout/hosted", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            items: [
              {
                name: "Puma Shoes", 
                id: "shoe"
              },
              {
                name: "Nike Sliders", 
                id: "slippers"
              }
            ],
            customerName: "Abdul Rahman K M",
            customerEmail: "donrahman6@gmail.com",
        })
    })
        .then(r => r.text())
        .then(r => {
            window.location.href = r
        })

}

  async function handleToken(token) {
    console.log(token);
    await axios.post("http://localhost:8082/therapists/api/v1/payments/demo/charge", "", {
      headers: {
        "Stripe-Token": token.id, 
        "Stripe-Amount": 500,
      },
    }).then(() => {
      alert("Payment Success");
    }).catch((error) => {
      alert(error);
    });

    // const val = {name: "abdu"}
    // await axios.post("http://localhost:8082/therapists/api/v1/payments/demo/charge",val, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Stripe-Token": token.id, 
    //     "Stripe-Amount": 500,
    //     "Authorization": "Bearer Suni"
    //   },
      
    // }).then(() => {
    //   alert("Payment Success");
    // }).catch((error) => {
    //   alert(error);
    // });


    // await axios.post("http://localhost:8082/therapists/api/v1/payments/demo/check").then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   alert(error);
    // });
  }

  return (
    <div className="App">
 <button onClick={initiatePayment} className="bg-rose-600 p-20">Checkout</button>




      <Stripe
        stripeKey="pk_test_51O8UHMSE2trOk8P8Bj2BKzWdrsFuIQN7ZqrWE0dcG5syooB0EcII5llsXXiYJbJqj7qwbeHNhOt4ZYsUVaX6AL92002l31zdYC"
        token={handleToken}
        currency="USD"
      />
    </div>
  );
}
export default PaymentTest;