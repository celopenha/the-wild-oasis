import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isChekingOut } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out"}),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("There is an error while checking out")
    }
  });

  return { checkout, isChekingOut }
}