import React from 'react';
import { useHistory } from"react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from "@material-ui/icons/Search";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Projects from '../components/Projects';
import AddProject from '../components/AddProject';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { Button} from '@material-ui/core';
import InputBase from "@material-ui/core/InputBase";
// import AddIcon from '@material-ui/icons/Add';
// import Fab from '@material-ui/core/Fab';
// import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const logout = () => {
   
    axios.post("http://localhost:8080/logout").then((resp) => {
    //jei saugojot kazkur userio info, is ten reikia istrint
    history.push('/');})
  };

  const getProjectCSV = () => {
        return axios.get('http://localhost:8080/api/projects/export')
        .then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', `projects.csv`); 
             document.body.appendChild(link);
             link.click();
          });
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
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sveiki, admin@mail.com!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}> 
          <Typography variant="h6">
            VARTOTOJAS
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/api/projects" className={classes.link}>
            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={"Projektai"}></ListItemText>
            </ListItem>
          </Link>
          <Link to="/tasks" className={classes.link}>
            <ListItem button>
              <ListItemIcon><ListAltIcon /></ListItemIcon>
              <ListItemText primary={"U??duotys"}></ListItemText>
            </ListItem>
          </Link>
          <Link to="/status" className={classes.link}>
          <ListItem button>
              <ListItemIcon><TimelapseIcon /></ListItemIcon>
              <ListItemText primary={"B??senos"}></ListItemText>
            </ListItem>
             </Link>
        </List>
        <Divider />
          <List>
            <ListItem button onClick={  logout }>
              <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
              <ListItemText primary={"Atsijungti"}></ListItemText>
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <AddProject/>
        <SearchIcon /> 
        <InputBase
            placeholder="Search" variant="outlined" 
            onChange={(e) => console.log(e.target.value)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
              
            }}
          />
        <Projects />
        <br/>
        <Button onClick={getProjectCSV} variant="outlined" className={classes.button} startIcon={<ImportExportIcon/>}>EKSPORTUOTI PROJEKTUS</Button>
        <br/>
      </main>
    </div>
    
  );
  
}
