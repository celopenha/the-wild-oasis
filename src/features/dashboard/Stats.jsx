import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
/* eslint-disable react/prop-types */

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.total_price, 0);
  const checkins = confirmedStays?.length;
  // occupation is the number of checkd in nights / number of available nights
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.num_nights,
    0
  );
  const occupationRate = occupation / (numDays * cabinCount);

  return (
    <>
      <Stat
        title={"Bookings"}
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Chek ins"}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"Ocuppance rate"}
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupationRate * 100)+ "%"}
      />
    </>
  );
}

export default Stats;
