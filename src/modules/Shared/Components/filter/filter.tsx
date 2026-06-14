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
        gap:2,
         px: 2,      
    mb: 3, 
    }}>
      <TextField
        placeholder="Search..."
        value={searchValue}
        sx={{
             ...textFieldStyle,
    flex: 2,
        }}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {filters.map((filter) => (
        <FormControl key={filter.key}  sx={{
             ...textFieldStyle,
    flex: 1,
        }}>
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

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F5F6F8',
    borderRadius: '4px',
    height: '44px',

    '& fieldset': {
      border: 'none',
    },

    '& input': {
      padding: '8px 12px',

      fontSize: '14px',

    },

    '& input::placeholder': {
      color: '#D3D6DC',
      opacity: 1,
      fontSize: '14px',
    },
  },
};