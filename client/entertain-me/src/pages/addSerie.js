import React from 'react';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import { useMutation } from '@apollo/client';
import { ADD_SERIES } from '../config/addMovies'
import FormPage from '../components/Form';
import {formStyles} from '../config/styleUI'
import { ENTERTAIN_ME } from '../config/query'
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'

const AddSeries = () => {
    const classes = formStyles()
    const [addTvSeries, { data, loading, error }] = useMutation(ADD_SERIES, {
        refetchQueries: [{ query: ENTERTAIN_ME }]
    })

    const handleAddData = (payload) => {
        console.log(payload)
        addTvSeries({
            variables: {
                newSerie: payload
            }
        })
    }

    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    return (
        <Container maxWidth="lg">
        <div>
            <h1 className={classes.root}>Add Series</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormPage link={'/series/'} handleForm={handleAddData} />
                </Grid>
            </Grid>
        </div>
        </Container>
    );
};

export default AddSeries;