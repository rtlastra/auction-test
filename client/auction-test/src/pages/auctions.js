import React, { useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { httpRequest } from '../http-request';
import Modal from '../components/Modal';
import AuctionInfo from '../components/AuctionInfo';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 520,
  },
  fixedHeight2: {
    height: 170,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
const image = 'https://www.infobae.com/new-resizer/_TTmdHPLoc90XTET0h_PIxmKrVo=/1200x900/filters:format(jpg):quality(85)//s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/07/04064515/Iguana-florida1.jpg';

const tileData = [
  {
    img: image,
    title: 'Image1',
    author: 'author1',
  },
  {
    img: image,
    title: 'Image2',
    author: 'author2',
  },
  {
    img: image,
    title: 'Image3',
    author: 'author3',
  },

];

const Auctions = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [auctions, setAuctions] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [biddingId, setBiddingId] = React.useState('');
  const [auctionsInfo, setAuctionsInfo] = React.useState('');

  useEffect(() => {
    const data = async () => {
      const result = await httpRequest.get(`v1/biddings`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setAuctions(result.data.data);
    }
    data();
  }, []);

  const handleClickOpen = (biddingId) => {
    const data = async () => {
      const result = await httpRequest.get(`v1/biddings/${biddingId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setAuctionsInfo(result.data.data);
    }
    data();
    setOpenModal(true);
    setBiddingId(biddingId);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList}>
                {auctions.map((action) => (
                  <GridListTile key={action.id}>
                    <img src={image} alt={action.name} />
                    <GridListTileBar
                      title={action.name}
                      subtitle={<span>Descripción: {action.description}</span>}
                      actionIcon={
                        <IconButton aria-label={`info about ${action.name}`} className={classes.icon}>
                          <InfoIcon
                            onClick={() => { handleClickOpen(action.id) }}
                          />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {localStorage.getItem('role') == 'admin' &&
        <Modal
          setAuctions={setAuctions}
          auctions={auctions}
        />
      }
      <AuctionInfo
        open={openModal}
        handleClose={handleClose}
        data={auctionsInfo}
      />
    </Container>
  );
};
export default Auctions;