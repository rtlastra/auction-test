import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiFab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import { httpRequest } from '../http-request';
import Notification from './Notification';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '98%',
  },
  Button: {
    marginTop: theme.spacing(2),
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Fab = withStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))(MuiFab);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Modal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [severity, setSeverity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
    event.preventDefault();
    const { name, description, startingPrice, initialDate, finalDate } = formData;
    try {
      const createAuctions = await httpRequest.post(`v1/biddings`, {
        name, description, starting_price: startingPrice, initial_date: initialDate, final_date: finalDate, status: 0
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const info = createAuctions.data.data;
      const actions = props.auctions;
      const allActions = [...actions, info];
      props.setAuctions(allActions);
      handleClose();
    } catch (errors) {
      console.log(errors.response.data.errors.base[0]);
      setSeverity('error');
      setErrorMessage(errors.response.data.errors.base[0]);
      setOpenNotification(true);
    }
  };

  return (
    <div>
      <Fab variant="outlined" color="primary" onClick={handleClickOpen}>
        Crear subasta
      </Fab>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crear nueva subasta
        </DialogTitle>
        <DialogContent dividers>
          <form validate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleInputs}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              id="description"
              autoComplete="description"
              onChange={handleInputs}
            />
            <TextField
              id="startingPrice"
              name="startingPrice"
              label="Precio Inicial"
              type="number"
              defaultValue="0"
              className={classes.textField}
              onChange={handleInputs}
            />
            <TextField
              id="initialDate"
              name="initialDate"
              label="Fecha Inicial"
              type="datetime-local"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputs}
            />
            <TextField
              id="finalDate"
              name="finalDate"
              label="Fecha Final"
              type="datetime-local"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputs}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.Button}
              onClick={onHandleSubmit}
            >
              Crear
              </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        openNotification={openNotification}
        severity={severity}
        message={errorMessage}
        setOpenNotification={setOpenNotification}
      />
    </div>
  );
}