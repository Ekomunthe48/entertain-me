import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {cardStyles} from '../config/styleUI'
import { FavoriteBorder, Favorite, Edit, Delete, Movie } from "@material-ui/icons/";
import { Link, useLocation } from 'react-router-dom';
import { collectionFavMovieVar } from '../config/cache'
import Chip from '@material-ui/core/Chip';
import { GET_FAV_MOVIE } from '../config/query'
import { useQuery } from '@apollo/client';

const CardList = ({item, link, handleDelete}) => {
    const classes = cardStyles();
    const [status, setStatus] = useState(false)
    const location = useLocation();
    const {data, loading, error} = useQuery(GET_FAV_MOVIE)

    useEffect(() => {
      let favData = data.collectionFavMovie.filter(fav => fav.title === item.title)
      if (favData > 0) {
        setStatus(true)
      }
    }, [])

    const handleFav = (id) => {
      const currentFav = collectionFavMovieVar()
      const exitIndex = currentFav.findIndex(fav => fav._id === item._id)
      if (exitIndex >= 0) {
        const updateFav = [...currentFav]
        const remove = updateFav.map(item => {
          return item.id
        }).indexOf(item._id)
        updateFav.splice(remove, 1)
        setStatus(false)
        collectionFavMovieVar([...updateFav])
      } else {
        setStatus(true)
        collectionFavMovieVar([...currentFav, item])
      }
    }

    return (
      <Card className={classes.root}>
        <Link to={(link) ? `${link}${item._id}` : `/favorite`} className={classes.listColor}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.poster_path}
            title={item.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {item.tags.map(e =>  <Chip
                  label={e}
                  clickable
                  color="secondary"
                  variant="outlined"
                  style={{margin: 5}}
                />)}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Link>
        {
          (location.pathname !== '/') ?
            <CardActions key={item._id} className={classes.action}>
              <Button size="small" color="secondary" onClick={() => handleFav(item._id)}>
                {
                  (location.pathname !== `/favorite`) ?
                  ((status !== true) ? <FavoriteBorder /> : <Favorite />) :
                  ((status !== true) ? <Favorite /> : <FavoriteBorder />)
                }
              </Button>
              {
                  (location.pathname !== `/favorite`) ? <>
                    <Link to={`${link}edit/${item._id}`}>
                      <Button size="small" color="secondary">
                        <Edit />
                      </Button>
                    </Link>
                    <Button size="small" color="secondary" onClick={() => handleDelete(item._id)}>
                      <Delete />
                    </Button>
                  </> : <></>
              }
            </CardActions> : <></>

        }
      </Card>
    );
};

export default CardList;