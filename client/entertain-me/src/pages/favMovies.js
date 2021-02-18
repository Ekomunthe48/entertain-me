import React from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_FAV_MOVIE } from '../config/query'
import CardList from '../components/Card'
import Grid from '@material-ui/core/Grid';
import { homeStyles } from '../config/styleUI';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'
import { Typography } from '@material-ui/core';

const FavMovies = () => {
    const {data, loading, error} = useQuery(GET_FAV_MOVIE)

    console.log(data);

    const classes = homeStyles();
    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    if (data.collectionFavMovie.length === 0) {return <>
        <Lottie animationData={ErrorPage} />
        <Typography variant="h3" color='secondary' gutterBottom>
            No Found Favorite Movie or Series
        </Typography>
    </>}
    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color='secondary' gutterBottom>
                            Favorite
                        </Typography>
                        <Grid item xs={12}>
                            <GridList className={classes.grid}>
                            {
                                data?.collectionFavMovie.map(fav => {
                                    return <CardList key={fav._id} item={fav} />
                                })
                            }
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default FavMovies;