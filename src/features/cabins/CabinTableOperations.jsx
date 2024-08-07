import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter filterField={"discount"} options={[
        {value: "all", label: "All"},
        {value: "no-discount", label: "No discount"},
        {value: "with-discount", label: "With discount"}
      ]} />
      <SortBy options={[
        {value: "name-asc", label: "Sort by name (A-Z)"},
        {value: "name-desc", label: "Sort by name (Z-A)"},

        {value: "regular_price-asc", label: "Sort by price(low first)"},
        {value: "regular_price-desc", label: "Sort by price(high first)"},

        {value: "max_capacity-asc", label: "Sort by max capacity(low first)"},
        {value: "max_capacity-desc", label: "Sort by max capacity(high first)"}
      ]}/>
    </TableOperations>
  );
};

export default CabinTableOperations;
