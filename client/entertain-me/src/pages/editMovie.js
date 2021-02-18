import React from 'react';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_MOVIES } from '../config/editMovies'
import FormPage from '../components/Form';
import {formStyles} from '../config/styleUI'
import { ENTERTAIN_ME, GET_BYID } from '../config/query'
import { useParams } from 'react-router-dom';
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'

const EditMovie = () => {
    const { id } = useParams()
    const classes = formStyles()

    const {data, loading, error} = useQuery(GET_BYID, {
        variables: {
            _id: id
        }
    })

    const [editMovie] = useMutation(UPDATE_MOVIES, {
        refetchQueries: [
            { query: ENTERTAIN_ME },
            { query: GET_BYID}
        ]
    })

    const handleEditForm = (payload) => {
        console.log(payload)
        editMovie({
            variables: {
                _id: id,
                updatedMovie: payload
            }
        })
    }

    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    return (
        <Container maxWidth="lg">
        <div>
            <h1 className={classes.root}>Edit Movie</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormPage link={'/movies/'}  handleForm={handleEditForm} item={data?.movie} />
                </Grid>
            </Grid>
        </div>
        </Container>
    );
};

export default EditMovie;