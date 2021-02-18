import React from 'react';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import { useMutation } from '@apollo/client';
import { ADD_MOVIES } from '../config/addMovies'
import FormPage from '../components/Form';
import {formStyles} from '../config/styleUI'
import { ENTERTAIN_ME } from '../config/query'
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'

const AddMovies = () => {
    const classes = formStyles()
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIES, {
        refetchQueries: [{ query: ENTERTAIN_ME }]
    })

    const handleAddData = (payload) => {
        console.log(payload)
        addMovie({
            variables: {
                newMovie: payload
            }
        })
    }

    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    return (
        <Container maxWidth="lg">
        <div>
            <h1 className={classes.root}>Add Movie</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormPage link={'/movies/'} handleForm={handleAddData} />
                </Grid>
            </Grid>
        </div>
        </Container>
    );
};

export default AddMovies;