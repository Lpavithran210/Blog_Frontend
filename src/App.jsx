import { Box } from '@mui/material'
import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))
const Home = lazy(() => import('./pages/Home'))
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'))
const ErrorPage = lazy(() => import('./pages/404'))
const CreatePost = lazy(() => import('./pages/blogs/CreateBlog'))
const PersonalBlogs = lazy(() => import('./pages/blogs/PersonalBlogs'))
const Profile = lazy(() => import('./pages/Profile'))
const EditProfile = lazy(() => import('./pages/EditProfile'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const BlogDetails = lazy(() => import('./pages/blogs/BlogDetails'))

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn')
  return (
    <BrowserRouter>
      <Suspense fallback={<Box sx={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src='/1.png' width={100}/></Box>}>
        <Routes>
          {!isLoggedIn && <>
            <Route path='/signin' element={<Login />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route path='/verify_otp' element={<VerifyOTP />} />
            <Route path='/signup' element={<Signup />} />
          </>}
          <Route element={<ProtectedRoute />}>
            <Route path='/signin' element={<Navigate to='/' />} />
            <Route path='/forgot_password' element={<Navigate to='/' />} />
            <Route path='/verify_otp' element={<Navigate to='/' />} />
            <Route path='/signup' element={<Navigate to='/' />} />
            <Route path='/personal-blogs' element={<PersonalBlogs />} />
            <Route path='/blog_detail' element={<BlogDetails />} />
            <Route path='dashboard' element={<Dashboard />}>
              <Route index element={<Navigate to="personal-blogs" />} />
              <Route path='personal-blogs' element={<PersonalBlogs />} />
              <Route path='edit-profile' element={<EditProfile />} />
              <Route path='add-blog' element={<CreatePost />} />
            </Route>
            <Route path='/profile/:username' element={<Profile />} />
            <Route path='/' element={<Home />} />

          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
