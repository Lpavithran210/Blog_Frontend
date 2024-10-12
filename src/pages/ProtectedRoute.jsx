import { Navigate, Outlet } from "react-router-dom"
import Header from "./components/Header"
import { Box } from "@mui/material"

const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem('loggedIn')

    return isLoggedIn === "true" ? <>
        <Header />
        <Box sx={{maxWidth: '1400px', margin: 'auto'}}>
            <Outlet />
        </Box>
    </> : <Navigate to='/signin' />
}

export default ProtectedRoute