import React, { useState, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { httpRequest } from '../http-request';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  ThemeProvider,
  Paper,
  Snackbar
} from '@material-ui/core';

function Advice(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

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
  form: {
    width: '100%',
    marginTop: '20px',
  },
  login: {
    padding: '1px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/signup" {...props} />
));

const LogIn = ({ history }) => {

  const [formData, setFormData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleShowError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleInputs = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      });
  };

  const onHandleSubmit = async (event) => {
    const { email, password } = formData;
    event.preventDefault();
    try {
      const sessions = await httpRequest.post(`v1/sessions`, { email, password })
      const info = sessions.data.data;
      localStorage.setItem('token', info.token)
      localStorage.setItem('username', info.username)
      localStorage.setItem('userId', info.user_id)
      localStorage.setItem('role', info.role.name)
      history.push("/dashboard");
    } catch (error) {
      console.log('Error description: ' + error);
      handleShowError();
    }
  };

  const currentUser = 1
  const classes = useStyles();

  if (!currentUser) {
    return <Redirect to="login" />;
  }
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paperNav}>Subastas Online</Paper>
        </Grid>
        <Grid item xs={false} sm={5} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} className={classes.login}>
          <div className={classes.paper}>
            <ThemeProvider theme={theme}>
              <Typography component="h1" variant="h3">
                Ingresa ahora
            </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleInputs}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputs}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onHandleSubmit}
                >
                  Ingresa
              </Button>
                <Grid container>
                  <Grid container justify="center">
                    <Link href="#" variant="body2">
                      Olvidaste tu contraseña?
                </Link>
                  </Grid>
                  <Grid container justify="center">
                  <Link component={LinkBehavior} variant="body2">
                      {"Aún no tienes cuenta? Regístrate ahora"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </ThemeProvider>
          </div>
        </Grid >
      </Grid >
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Advice onClose={handleClose} severity="error">
          Credenciales incorrectas, intente de nuevo.
        </Advice>
      </Snackbar>
    </div>
  );
}

export default withRouter(LogIn);