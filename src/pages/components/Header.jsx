import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../features/user"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userInfo = useSelector(state => state.user.userInfo)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleLogout = () => {
    setAnchorElUser(null)
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('loggedIn')
    window.location.reload()
  }
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  return <Box sx={{ backgroundColor: 'white', boxShadow: '0px 0px 1px 0px', width: '100%', position: 'sticky', top: 0, zIndex: 1, height: '75px', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
    <img src='/1.png' width={100} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
    <Box sx={{ mr: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton onClick={(event) => setAnchorElUser(event.currentTarget)} sx={{ p: 0 }}>
        <Avatar src={userInfo.profile_pic} />
      </IconButton>
      <Menu
        anchorEl={anchorElUser}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: '150px',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.12))',
              mt: 1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={anchorElUser}
        onClose={() => setAnchorElUser(null)}>
        <MenuItem onClick={() => [setAnchorElUser(null), navigate(`/profile/${userInfo.name}`)]}>
          <Typography fontSize={'14px'}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => [setAnchorElUser(null), navigate(`/dashboard`)]}>
          <Typography fontSize={'14px'}>Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ display: 'block' }}>
          <Typography fontSize={'14px'} fontWeight={500}>Sign Out</Typography>
          <Typography fontSize={'12px'}>@{userInfo.name}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  </Box>
}

export default Header