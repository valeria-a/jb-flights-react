import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import axios from "axios";
import { GOOGLE_AUTH_URL, LOGIN_URL, ME_URL } from "../../infra/urls";
import { SetUserContext, UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SetNotificationContext } from "../../context/notificationContext";
import MyBox from "../common/myBox";
import { ERROR } from "../../localize/texts_en";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";


export default function LoginPage() {

    const navigate = useNavigate()
    const setUser = useContext(SetUserContext)
    const setNotification = useContext(SetNotificationContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = 
        await axios.post(LOGIN_URL, {username: email, password: password})
      console.log(response)
      localStorage.setItem('token', response.data.access)

      const token = localStorage.getItem('token')
      const meResponse = await axios.get(ME_URL,
          {headers: {Authorization: `Bearer ${token}`}})
      console.log(meResponse)
      setUser({
          user: {...meResponse.data}
      })
      navigate('/')
      setNotification({open: true, 
          msg: "You have successfully logged in", 
          severity: 'success'})
    } catch (e) {
      console.log(e)
      setNotification({open: true, msg: `${ERROR}: ${e.response.data.detail}`, severity: 'error'})
    }
    

  };

  return (
    <GoogleOAuthProvider clientId="872794659630-ehu55i6a7fbglef45mjno5pgjv7qeab9.apps.googleusercontent.com">
    <Container component="main" maxWidth="xs">
      <MyBox>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

        <GoogleLogin onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const response = await axios.post(
                GOOGLE_AUTH_URL, 
                {google_jwt: credentialResponse.credential})

                localStorage.setItem('token', response.data.access)

                const token = localStorage.getItem('token')
                const meResponse = await axios.get(ME_URL,
                    {headers: {Authorization: `Bearer ${token}`}})
                console.log(meResponse)
                setUser({
                    user: {...meResponse.data}
                })
                navigate('/')
                setNotification({open: true, 
                    msg: "You have successfully logged in", 
                    severity: 'success'})
            }}
            onError={() => {
              console.log('Login Failed');
            }}/>

        </Box>
      </MyBox>
    </Container>
    </GoogleOAuthProvider>
  );
}