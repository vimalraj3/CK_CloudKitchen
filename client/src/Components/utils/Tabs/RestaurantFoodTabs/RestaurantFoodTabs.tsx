import React from 'react'
import Box from '@mui/material/Box';
import { StyledTabs, StyledTab, TabPanel, allyProps } from '../Tabs';
import FoodCardCon from '../../../Restaurant/RestaurantOrderPage/FoodCard';
import { Reviews } from '../../../Restaurant/Reviews/Reviews';


export const RestaurantFoodTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className='w-[100%] mt-8'>
            <Box sx={{ bgcolor: '#fff' }}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                >
                    <StyledTab label="Menu" {...allyProps(0)} />
                    <StyledTab label="Reviews" {...allyProps(1)} />
                    <StyledTab label="Description" {...allyProps(2)} />
                </StyledTabs>
            </Box>
            <div className='mt-9'>
                <TabPanel value={value} index={0}>
                    <div className='md:px-5'>
                        <FoodCardCon />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className='md:px-5'>
                        <Reviews />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </div>
        </div >
    );
}