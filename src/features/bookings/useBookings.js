import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //filter
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue }
  //sorting
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  if(page > 1){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page - 1 })
    })
  }

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page })
  })

  const pageCount = Math.ceil(count / PAGE_SIZE)

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page + 1 })
    })
  }

  return {
    isLoading, bookings, error, count
  }
}