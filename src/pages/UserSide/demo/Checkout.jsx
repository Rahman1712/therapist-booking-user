import axios from "axios"

const Checkout = () => {

const  checkoutHandle = (e) => {
  e.preventDefault();
  
  axios.post("http://localhost:4242/create-checkout-session").then((response) => {
    console.log(response);
  })
}

  return (
<section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <button onClick={checkoutHandle} className="p-2 bg-blue-400 text-green-700">Checkout</button>

   
    {/* <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form> */}
  </section>
  )
}

export default Checkout

