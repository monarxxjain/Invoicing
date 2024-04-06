"use client"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';

export default function InvestorPortfolioTab({ tabs }) {
  const [value, setValue] = useState('1'); // Initially set value as string '1'

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue); // Log the new value
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example" className='px-6 py-4'>
          {tabs.map((tab, index) => ( // Changed 'id' to 'index' for clarity
            <Tab key={index} label={tab} value={(index + 1).toString()} sx={{ textTransform: 'none' }}/>
          ))}
        </TabList>
        {tabs.map((tab, index) => ( // Changed 'id' to 'index' for clarity
          <TabPanel key={index} value={(index + 1).toString()}>Item {index + 1}</TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
