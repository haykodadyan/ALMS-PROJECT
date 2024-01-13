import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CustomTabs = ({ pages, handleButtonClicks }) => {
    const location = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const pageIndex = pages.findIndex(page => `/${page.toLowerCase()}` === location.pathname);
        if (pageIndex !== -1) {
            setValue(pageIndex);
        }
    }, [location, pages]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleButtonClicks(pages[newValue]);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {pages.map((elem, index) => (
                        <Tab sx={{ color: 'white' }} key={index} label={elem} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};

export default CustomTabs;
