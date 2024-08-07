/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {

  const {checkout, isChekingOut} = useCheckout();

  return (
    <Button disabled={isChekingOut} onClick={()=> checkout(bookingId)} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
