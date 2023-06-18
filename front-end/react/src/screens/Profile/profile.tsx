import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form, Formik } from 'formik';
import { Divider, Grid, Snackbar } from '@material-ui/core';
import { SlideTransition } from '../SignUp/sign-up';
import { Alert } from '@material-ui/lab';
import * as api from '../../api';
import { setSessionCookie } from '../../session';
import { useAuth } from '../../hooks/useAuth';
import { IUser } from '../../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      background: theme.palette.background.paper,
      padding: '1rem 2rem',
      borderRadius: '10px',
      boxShadow: theme.shadows[5],
    },
    avatar: {
      height: '10rem',
      width: '10rem',
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    typography: {
      marginLeft: theme.spacing(6),
      color: theme.palette.grey[500]
    },
    typography2: {
      marginLeft: theme.spacing(2),
    },
  })
);

export const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [message] = useState<string | undefined>(undefined);
  const [user,setUser] = useState<IUser>();


  useEffect(() => {
    const fetchUser = async () => {
      const {user} = await useAuth();
      if(user) setUser(user)
    }
    fetchUser();
  },[]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log(user)
  return (
    <Container component='main' maxWidth='sm'>
      <div className={classes.paper}>
       <Avatar
                    src={user?.image_url}
                    aria-label='recipe'
                    className={classes.avatar}
                    variant='circular'
                  >
                    {user && user.firstName.charAt(0)}
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.typography}>
          First Name:
          <br></br>
          Last Name: 
        </Typography>
        <Typography component='h1' variant='h5' className={classes.typography2}>
          {user?.firstName}
          <br></br>
          {user?.lastName}
        </Typography>

      </div>
    </Container>
  );
};
