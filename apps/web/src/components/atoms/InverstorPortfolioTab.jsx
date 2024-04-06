"use client"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';


export default function InvestorPortfolioTab({tabs}) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className='px-6 py-4'>
            {tabs.map((tab, id)=>{
              return (
                <Tab key={id} label={tabs[id]}  value={id+1} sx={{ textTransform: 'none' }}/>
              )
            })}
          </TabList>
        </Box>
        {tabs.map((tab, id)=>{
              return (
                <TabPanel key={id} value={id+1}>Item {id+1}</TabPanel>
              )
            })}
      </TabContext>
    </Box>
  );
}
