import React from 'react';
import clsx from 'clsx';

//MUIstyles
import { makeStyles, useTheme } from '@material-ui/core/styles';
//MUIcore
import { Drawer, CssBaseline, AppBar, Toolbar, Divider, IconButton, MenuItem, MenuList, Button } from '@material-ui/core';
//MUIicons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
//Images
import logo1 from '../../Images/KnowMe.png';
import logo2 from '../../Images/QuestionMark.png';

//Router Link
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
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


//FUNCTION ALL COMPONENT
export default function PersistentDrawerLeft() {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo2} alt="logo2" />
          {/* <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography> */}
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
          <img src={logo1} alt="logo1" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {/* Side Item List */}
        <MenuList>
          <Divider variant="middle" />

          <MenuItem>
            <Button component={Link} to="/" onClick={handleDrawerClose}>
              Home
          </Button>
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem>
            <Button component={Link} to="/login" onClick={handleDrawerClose}>
              Login
          </Button>
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem>
            <Button component={Link} to="/login" onClick={handleDrawerClose}>
              Sign Up
          </Button>
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem>
            <Button component={Link} to="/Lobby" onClick={handleDrawerClose}>
              Lobby
          </Button>
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem>
            <Button component={Link} to="/Rules" onClick={handleDrawerClose}>
              Rules
          </Button>
          </MenuItem>
        </MenuList>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      </main>
    </div >
  );
}