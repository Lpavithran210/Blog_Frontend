import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Grid } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const sidebar = [
        { icon: <DescriptionOutlinedIcon fontSize="small" />, title: 'Blog', path: 'personal-blogs' },
        { icon: <CreateIcon fontSize="small" />, title: 'Write', path: 'add-blog' },
        { icon: <PersonIcon fontSize="small" />, title: 'Edit Profile', path: 'edit-profile' }
    ]
    const handleClick = (index, path) => {
        setSelectedIndex(index)
        navigate(path)
    }
    return <>
        <Grid container sx={{ px: { xs: 2, md: 9 }, my: 2 }} spacing={2}>
            <Grid item xs={3}>
                <Typography variant="body2" fontWeight={600} sx={{display: {xs: 'none', sm: 'block'}}}>Dashboard</Typography>
                <List>
                    {sidebar.map((item, index) => {
                        return <ListItem key={index} sx={{ maxWidth: { xs: 'max-content', md: '100%' } }} disablePadding>
                            <ListItemButton selected={selectedIndex === index} sx={{ borderRight: selectedIndex === index ? '2px solid #122620' : 'none' }} onClick={() => handleClick(index, item.path)}>
                                <ListItemIcon sx={{ minWidth: '25px' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block', fontSize: '14px' } }}>{item.title}</Typography>
                            </ListItemButton>
                        </ListItem>
                    })}
                </List>
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </Grid>
    </>
}

export default Dashboard