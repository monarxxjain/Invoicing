import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';

export default function SelectMenu() {
  const [deal, setDeal] = React.useState(1);

  const handleChange = (event) => {
    setDeal(event.target.value);
  };


  return (
      <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
        <InputLabel id="demo-select-small-label">Deal</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={deal}
          label="Deal"
          onChange={handleChange}
        >
          <MenuItem value={1}>Deal 1</MenuItem>
          <MenuItem value={2}>Deal 2</MenuItem>
          <MenuItem value={3}>Deal 3</MenuItem>
        </Select>
      </FormControl>
  );
}