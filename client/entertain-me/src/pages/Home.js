import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client'
import { ENTERTAIN_ME } from '../config/query'
import CardList from '../components/Card'
import Grid from '@material-ui/core/Grid';
import { homeStyles } from '../config/styleUI';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container'
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'
import { Random, Wave } from 'react-animated-text'
import { Typography } from '@material-ui/core';

const Home = () => {
    const {data, loading, error} = useQuery(ENTERTAIN_ME)
    const classes = homeStyles();

    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Typography variant="h3" color='secondary' gutterBottom>
                        <Wave
                            text="Welcome To Entertain Me"
                            effect="pop"
                            effectChange={2.0}
                            effectDuration={0.3}
                        />
                    </Typography>
                        <Grid item xs={12}>
                        <Typography variant="h6" color='secondary' gutterBottom>
                            Movies
                        </Typography>
                            <GridList className={classes.grid}>
                            {
                                data?.movies.map(movie => {
                                    return <CardList key={movie._id} link={'/movies/'} item={movie} />
                                })
                            }
                            </GridList>
                        </Grid>
                        <Typography variant="h6" color='secondary' gutterBottom>
                            TV Series
                        </Typography>
                        <Grid item xs={12} style={{ margin: 8}}>
                            <GridList className={classes.grid}>
                            {
                                data?.tvSeries.map(tvSerie => {
                                    return <CardList key={tvSerie._id} link={'/series/'} item={tvSerie} />
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

export default Home
