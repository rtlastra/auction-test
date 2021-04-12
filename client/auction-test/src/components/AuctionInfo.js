import React, { useState, useEffect } from 'react';
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

export default function AuctionInfo(props) {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(false);
  const [severity, setSeverity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(null);

  console.log(props.data)
  const handleInputs = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      });
  };

  const onHandleSubmit = async (event) => {
    const { price } = formData;
    event.preventDefault();
    try {
      const createAuctions = await httpRequest.put(`v1/biddings/${props.data.biddings.id}`, {
        actual_price: price, user_id: localStorage.getItem('userId')
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const info = createAuctions.data.data;
      setSeverity('success');
      setErrorMessage(info);
      setOpenNotification(true);
      props.handleClose();
    } catch (errors) {
      setSeverity('error');
      setErrorMessage(errors.response.data.errors.base);
      setOpenNotification(true);
    }
  };

  const getPrice = () => {
    return props.data.biddings.user_id == null
      ? props.data.biddings.starting_price
      : props.data.biddings.actual_price
  }

  return (
    <div>
      <Dialog onClose={() => { props.handleClose() }} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={() => { props.handleClose() }}>
          Ofertar
        </DialogTitle>
        <DialogContent dividers>
          {props.data.biddings &&
            <Typography gutterBottom>
              Características de la Subasta:
              <ul>
                <li>Nombre del Producto: <strong>{props.data.biddings.name}</strong></li>
                <li>Descripción del Producto: <strong>{props.data.biddings.description}</strong></li>
                <li>Precio Actual <strong>{getPrice()}</strong></li>
              </ul>
            </Typography>
          }
          <form validate>
            <TextField
              id="price"
              name="price"
              label="Valor a ofertar"
              type="number"
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
              Realizar Oferta
              </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => { props.handleClose() }} color="primary">
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