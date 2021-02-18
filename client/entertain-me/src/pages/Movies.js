import React from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { ENTERTAIN_ME, GET_BYID } from '../config/query'
import CardList from '../components/Card'
import Grid from '@material-ui/core/Grid';
import { homeStyles } from '../config/styleUI';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { DELETE_MOVIES } from '../config/deleteMovies'
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'
import { Typography } from '@material-ui/core';

const Movies = () => {
    const {data, loading, error} = useQuery(ENTERTAIN_ME)

    const [deleteMovie] = useMutation(DELETE_MOVIES, {
        refetchQueries: [
            { query: ENTERTAIN_ME },
            { query: GET_BYID }
        ]
    })

    const handleDelete = (id) => {
        console.log(id);
        deleteMovie ({
            variables: {
                _id: id
            }
        })
    }

    const classes = homeStyles();
    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color='secondary' gutterBottom>
                            Movies
                        </Typography>
                        <Grid item xs={12}>
                            <GridList className={classes.grid}>
                            {
                                data?.movies.map(movie => {
                                    return <CardList key={movie._id} handleDelete={handleDelete} link={'/movies/'} item={movie} />
                                })
                            }
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>
                <Link to='/movies/create'>
                    <Tooltip title="Add" aria-label="add">
                        <Fab color="secondary" aria-label="add" className={classes.addButton}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Link>
            </div>
        </Container>
    );
};

export default Movies;