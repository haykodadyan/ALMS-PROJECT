import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {Fragment, useState} from 'react'
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 300;

export default function Sidebar({handleFiltering}) {
    const [searchInput, setSearchInput] = useState('')
    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }
    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <h1 style={{textAlign: 'center', borderBottom: '1px solid lightgrey'}}>Filtering Options</h1>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Box sx={{width: '80%'}}>
                            <TextField
                                value={searchInput}
                                onChange={handleInputChange}
                                fullWidth={true}
                                id="outlined-textarea"
                                label="Multiline Placeholder"
                                placeholder="Placeholder"
                                multiline
                            />
                        </Box>
                        <SearchIcon onClick={() => handleFiltering(searchInput)} cursor={'pointer'}/>
                    </Box>

                    <List>
                        {['All','Javascript', 'Java', 'C++', 'Programming', 'Software', 'Web', 'Math', 'Computer Science'].map((text, index) => (
                            <Fragment key={text}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleFiltering(text.toLowerCase())}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                                <div style={{width: '85%', display: 'flex', justifyContent: 'center'}}> <div style={{borderBottom: '1px solid lightgrey', height: '1px'}}></div> </div>
                            </Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
