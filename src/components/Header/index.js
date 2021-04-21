import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Link, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import CustomDrawer from '../CustomDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  const [openDrawer_ls, setOpenDrawer_ls] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <CustomDrawer needOpen={openDrawer_ls} setNeedOpen={setOpenDrawer_ls} />
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer_ls(!openDrawer_ls)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}