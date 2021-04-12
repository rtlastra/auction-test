import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { httpRequest } from '../http-request';
import {
  TextField,
  Button,
  Grid,
  Typography,
  ThemeProvider,
  Paper,
  Link
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695C'
    }
  }
});

theme.typography.h3 = {
  fontFamily: 'Montserrat',
  fontSize: '48px',
  fontStyle: 'normal',
  fontWeight: 300
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://image.flaticon.com/icons/png/512/1820/1820230.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '500px 500px',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '5px'
  },
  paperNav: {
    padding: theme.spacing(6),
    fontFamily: 'Montserrat',
    paddingBottom: '3px',
    marginLeft: '20px',
    fontSize: 'larger',
    color: '#00695C'
  },
  register: {
    padding: '1px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/login" {...props} />
));

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: ''
  });

  const handleInputs = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const onHandleSubmit = async (event) => {

    const { email, password, name, lastName } = formData;
    event.preventDefault();
    try {
      const createUser = await httpRequest.post(`v1/users`, { email, password, name, last_name: lastName })
      const sessions = await httpRequest.post(`v1/sessions`, { email, password })
      const info = sessions.data.data;
      localStorage.setItem('token', info.token)
      localStorage.setItem('username', info.username)
      localStorage.setItem('role', info.role.name)
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };


  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paperNav}>Subastas Online</Paper>
      </Grid>
      <Grid item xs={false} sm={5} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} className={classes.register}>
        <div className={classes.paper}>
          <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h3">
              Regístrate ahora
          </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleInputs}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onHandleSubmit}
              >
                Registrarse
          </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link component={LinkBehavior} variant="body2">
                    Ya tienes cuenta? Ingresa
              </Link>
                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(SignUp);