import React from 'react';
import { useQuery } from '@apollo/client'
import { GET_BYID_SERIES } from '../config/query'
import { useParams } from 'react-router-dom';
import { detailStyles } from '../config/styleUI';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Lottie from "lottie-react";
import Loading from '../assets/9825-loading-screen-loader-spinning-circle.json'
import ErrorPage from '../assets/20102-loading-animation-with-success-and-error.json'

const DetailSeries = () => {
    const { id } = useParams()
    const {data, loading, error} = useQuery(GET_BYID_SERIES, {
        variables: {
            _id: id
        }
    })

    const classes = detailStyles();

    if (loading) {return <Lottie animationData={Loading} />}
    if (error) {return <Lottie animationData={ErrorPage} />}
    return (
        <Container maxWidth="lg">
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${data?.tvSerie?.poster_path})` }}>
            {<img style={{ display: 'none' }} src={data?.tvSerie?.poster_path} alt={data?.tvSerie?.title} />}
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {data?.tvSerie?.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Popularity : {data?.tvSerie?.popularity}
                  </Typography>
                  <Typography variant="body2" color="light" component="p">
                    Tags:
                    {data?.tvSerie?.tags.map(e =>  <Chip
                      label={e}
                      clickable
                      color="secondary"
                      style={{margin: 5}}
                    />)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="h5" color="inherit" paragraph>
            Overview :
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {data?.tvSerie?.overview}
          </Typography>
        </Container>
    );
};

export default DetailSeries;