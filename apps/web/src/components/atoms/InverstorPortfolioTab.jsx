"use client"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';

export default function InvestorPortfolioTab() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className='px-6 py-4'>
            <Tab label="Ongoing Deals" value="1"   sx={{ textTransform: 'none' }}/>
            <Tab label="Liqudation Requested" value="2" sx={{ textTransform: 'none' }} />
            <Tab label="Liqudated Deals" value="3" sx={{ textTransform: 'none' }} />
            <Tab label="Completed Deals" value="4"  sx={{ textTransform: 'none' }}/>
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item four</TabPanel>
      </TabContext>
    </Box>
  );
}
