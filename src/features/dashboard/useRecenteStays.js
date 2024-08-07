import { useSearchParams } from "react-router-dom";
import { MIN_NUM_DAYS } from "../../utils/constants";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? MIN_NUM_DAYS
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`]
  });

  const confirmedStays = stays?.filter(stay => stay.status !== "unconfirmed")

  return { isLoading, stays, confirmedStays, numDays }
}