import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FlightsPage from './components/flights/flightsPage';
import OrdersPage from './components/orders/ordersPage';
import FlightDetails from './components/flights/flightDetails';
import LoginPage from './components/login/loginPage';
import UserProvider from './context/userContext';
import Notification from './components/notification/notification';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { serverErrors } from './localize/errors_he';

axios.interceptors.request.use(
  (config) => {
  
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)

axios.interceptors.response.use(
  (response) => {

    // if (response.status >= 400) {
    //   response.data.detail = serverErrors[response.data.detail]
    // }
    if (response.status === 500) {
      response.data['isServerError'] = true
    }
    response.data['isServerError'] = false
    return response
  }
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <FlightsPage />,
        // children: [
        //   {
        //     path: '/flights/:flightId',
        //     element: <FlightDetails />
        //   }
        // ]
      },
      {
        path: '/flights/:flightId',
        element: <FlightDetails />
      },
      {
        path: '/orders',
        element: <OrdersPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

const myTheme = {
  palette: {
    mode: 'dark'
    // primary: {
    //   main: red[500],
    // },
    // secondary: {
    //   main: '#f50057',
    // },
  },

  // typography: {
  //   fontSize: 12,
  //   button: {
  //     fontSize: 18
  //   }
  // }
  
}


const theme = createTheme(myTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
  <CssBaseline />
  
  <Notification>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Notification>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
