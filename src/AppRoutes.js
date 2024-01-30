import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/landingPage'
import MainContainer from './Components/MainContainer'
import Welcome from './Components/welcome/welcome'
import WorkArea from './Components/WorkArea'
import CreateGroup from './Components/group/CreateGroup'
import { useSelector, useDispatch } from 'react-redux';
import { isMobile } from './Features/sizeSlice';
import AddUser from './Components/addUser'
import { Add } from '@mui/icons-material'


const AppRoutes = () => {
  const Mobile = useSelector((state)=>state.sizeKey.value)
  const dispatch = useDispatch()
  useEffect(() => {
    const HandleResize = () => {
      dispatch(isMobile());
    };

    window.addEventListener('resize', HandleResize);
    return () => {
      window.removeEventListener('resize', HandleResize);
    };
  }, []);
  return (
    (
      Mobile ?
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='app' element={<MainContainer />}/>
        <Route path='/chat/:userID' element={<WorkArea />}/>
        <Route path='create-group' element={<CreateGroup/>}/> 
        <Route path='add-user' element={<AddUser/>}/>
      </Routes> 
      :
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='app' element={<MainContainer />}>
            <Route path='welcome' element={<Welcome />}/>
            <Route path='chat/:chatID' element={<WorkArea />}/>
            <Route path= 'add-user' element={<AddUser/>}/>
            <Route path='create-group' element={<CreateGroup/>}/> 
        </Route>

    </Routes>
    )
  )
}

export default AppRoutes;