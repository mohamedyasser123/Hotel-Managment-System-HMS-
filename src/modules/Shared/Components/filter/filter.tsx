import {
  Box,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from "@mui/material";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterItem {
  key: string;
  placeholder: string;
  options: FilterOption[];
}

interface SharedFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: FilterItem[];
  values: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export default function SharedFilter({
  searchValue,
  onSearchChange,
  filters = [],
  values,
  onFilterChange,
}: SharedFilterProps) {
  return (
    <Box sx={{
        display:"flex",
        gap:"2"
    }}>
      <TextField
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: 1 }}
      />

      {filters.map((filter) => (
        <FormControl key={filter.key} sx={{ minWidth: 180 }}>
          <Select
            displayEmpty
            value={values[filter.key] || ""}
            onChange={(e) =>
              onFilterChange(filter.key, e.target.value)
            }
          >
            <MenuItem value="">
              {filter.placeholder}
            </MenuItem>

            {filter.options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}