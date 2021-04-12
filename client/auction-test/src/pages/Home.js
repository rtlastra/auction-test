import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Typography } from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Auctions from './auctions';


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
  fontWeight: 300,
  marginTop: '30px',
  marginLeft: '30px'
}


const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar>
        <Switch>
        <Route path="/dashboard" component={Auctions} exact />
        <Route path="/dashboard/create-seller" component={Auctions} exact />
        </Switch>
      </Sidebar>
    </ThemeProvider>
  );
};
export default Home;