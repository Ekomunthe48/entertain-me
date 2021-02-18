import {useEffect, useState} from 'react'
import { GridList, TextField, FormControl, Button } from '@material-ui/core';
import {formStyles} from '../config/styleUI'
import { useHistory } from 'react-router-dom';
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable'
import { categoryOptions } from '../assets/category'

const FormPage = ({handleForm, link, item}) => {
    const classes = formStyles()
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPosterPath] = useState('')
    const [popularity, setPopularity] = useState()
    const [tags, setTags] = useState([])

    const history = useHistory()

    useEffect(() => {
      setTitle(item?.title)
      setOverview(item?.overview)
      setPosterPath(item?.poster_path)
      setPopularity(item?.popularity)
      let tagObj
      let tagsArray = item?.tags.map(tag => {
        tagObj = {
          label: tag,
          value: tag
        }
        return tagObj
      })
      setTags(tagsArray)
    }, [item])

    const handleTitle = (e) => {
      setTitle(e.target.value)
    }

    const handleOverview = (e) => {
      setOverview(e.target.value)
    }

    const handlePosterPath = (e) => {
      setPosterPath(e.target.value)
    }

    const handlePopularity = (e) => {
      setPopularity(+e.target.value)
    }

    const handleTags = (e) => {
      setTags(e);
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      let newTags = tags.map(tag => {
        return tag.value
      })
      let obj = {
        title,
        overview,
        poster_path,
        popularity,
        tags : newTags
      }
      handleForm(obj)
      history.push(link)
    }

    return (
        <GridList className={classes.grid}>
            <TextField
              id="standard-full-width"
              label="Title"
              placeholder="Title"
              style={{ margin: 8, height: 100 }}
              fullWidth
              value={title}
              onChange={handleTitle}
              />
            <TextField
              id="standard-full-width"
              label="Overview"
              placeholder="Overview"
              fullWidth
              style={{ margin: 8, height: 100 }}
              margin="normal"
              onChange={handleOverview}
              value={overview}
              />
            <TextField
              id="standard-full-width"
              label="Poster Path"
              placeholder="Poster Path"
              fullWidth
              style={{ margin: 8, height: 100 }}
              onChange={handlePosterPath}
              value={poster_path}
              variant="standard"
              />
            <TextField
              id="standard-full-width"
              label="Popularity"
              placeholder="Popularity"
              fullWidth
              style={{ margin: 8, height: 100 }}
              onChange={handlePopularity}
              value={popularity}
              variant="standard"
              />
              <p>{JSON.stringify(tags)}</p>
            <CreatableSelect
              value={tags}
              isMulti
              name="colors"
              options={categoryOptions}
              onChange={handleTags}
              className="basic-multi-select MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth"
              style={{marginBottom: 30, backgroundColor: 'none'}}
              classNamePrefix="select"
            />
            <Button color="inherit" onClick={handleSubmit}>Submit</Button>
        </GridList>
    );
};

export default FormPage;