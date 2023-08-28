import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { ME_URL } from './infra/urls';
import { SetUserContext } from './context/userContext';
import { Box, Container, CssBaseline, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import Notification from './components/notification/notification';






function App() {

  const setUser = useContext(SetUserContext)

  // const [mode, setMode] = useState('light')
  
  
  // const toggleColorMode = useMemo(() => 
  //   () =>{
  //     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //   }, 
  //   []
  // )

  

  // const theme = useMemo(
  //   () => createTheme({
  //     palette: {
  //       mode,
  //     }},
  //     [mode]
  //     ))

  useEffect(
    () => {
      const fetchData = async () => {
        // const token = localStorage.getItem('token')
        // if (token) {
          const meResponse = await axios.get(ME_URL)
            // {headers: {Authorization: `Bearer ${token}`}})
          console.log(meResponse)
          setUser({
            user: {...meResponse.data}
          })
        // }
        
      }
      fetchData()
    }, []
  )

  return (
      <>
        <Header />
        <Box paddingX={'24px'}>
          <Outlet />
        </Box>
        <Notification />
        </>
  )
}

export default App;
