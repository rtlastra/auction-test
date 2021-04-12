import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Button, Avatar, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'




const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  rootAvatar: {
    display: "flex",
    "&  *": {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
  }, email: {
    display: "flex",
    "&  *": {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    marginBottom: theme.spacing(1.5),
  },
  avatar: {
    color: "#FFFFFF",
    backgroundColor: "#00695C",
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.spacing(4),
  },
  title: {
    flexGrow: 1
  },
  links: {
    textDecoration: 'none',
    color: '#000'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Siderbar({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const routes = () => {
    return localStorage.getItem('role') == 'seller'
      ? [{ text: 'Subastas', path: '/dashboard', icon: <DashboardIcon /> }, { text: 'Mis subastas', path: '/dashboard/auctions', icon: <DonutLargeIcon /> }, { text: 'Agendamientos', path: '/dashboard/scheduling', icon: <TimelineIcon /> }]
      : [{ text: 'Subastas', path: '/dashboard', icon: <DashboardIcon /> }, { text: 'Agendamientos', path: '/dashboard/scheduling', icon: <TimelineIcon /> }]
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Subastas Online
          </Typography>
          <Button onClick={logout} color="inherit">Salir</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <div className={classes.rootAvatar}>
          <Avatar className={classes.avatar}>{localStorage.getItem('username').substr(0, 1).toUpperCase()}</Avatar>
        </div>
        <div className={classes.email}>
          <p>{localStorage.getItem('username')}</p>
        </div>

        <Divider />
        <List>
          {routes().map((route, index) => (
            <Link to={route.path} key={route.path} className={classes.links}>
              <ListItem button>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={logout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}
