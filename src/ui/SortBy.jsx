import { useSearchParams } from "react-router-dom/dist";
import Select from "./Select";

/* eslint-disable react/prop-types */
const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (event) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      value={sortBy}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
