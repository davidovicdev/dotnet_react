import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IFilters } from "../../interfaces/IFilters";

interface Props {
  filters: IFilters;
  dashboard: string;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}
export default function Filters({ filters, dashboard, setFilters }: Props) {
  const [perPage, setPerPage] = useState(filters.perPage);
  const [sortBy, setSortBy] = useState(filters.sortBy);
  const usersMenuItems = [
    { value: "FirstName", label: "First Name" },
    { value: "LastName", label: "Last Name" },
  ];
  const postsMenuItems = [
    { value: "Body", label: "Body" },
    { value: "Title", label: "Title" },
  ];
  const menuItemsToRender =
    dashboard === "users" ? usersMenuItems : postsMenuItems;

  const handlePerPageChange = (e: any) => {
    setPerPage(e.target.value);
    setFilters({ ...filters, perPage: e.target.value });
  };
  const handleSortByChange = (e: any) => {
    setSortBy(e.target.value);
    setFilters({ ...filters, sortBy: e.target.value });
  };
  const handleSearchChange = (e: any) => {
    setFilters({ ...filters, search: e.target.value });
  };
  return (
    <div style={{ display: "flex", width: "50%" }}>
      <FormControl fullWidth>
        <InputLabel id="perPage">Per Page</InputLabel>
        <Select
          labelId="perPage"
          id="perPage"
          value={perPage}
          label="Per Page"
          onChange={handlePerPageChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="sortBy">Sort By</InputLabel>
        <Select
          labelId="sortBy"
          id="sortBy"
          value={sortBy}
          label="Sort By"
          onChange={handleSortByChange}
        >
          {menuItemsToRender.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          onChange={handleSearchChange}
        />
      </FormControl>
    </div>
  );
}
