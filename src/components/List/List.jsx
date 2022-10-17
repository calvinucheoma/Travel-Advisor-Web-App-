import React, {useState, useEffect, createRef} from 'react';
import {CircularProgress, Typography, Grid, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';



const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);


  return (

    <div style={{padding: '25px'}}>

      <Typography variant='h4'>
        Restaurants, Hotels & Attractions Around You
      </Typography>

      {isLoading ? (
          <div style={{height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <CircularProgress size='5rem' /> </div>
        ) : (
          <>

          <FormControl sx={{ margin: '10px', minWidth: 120, marginBottom: '30px'}}>

            <InputLabel> Type </InputLabel>

            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>

          </FormControl>

          <FormControl sx={{ margin: '10px', minWidth: 120, marginBottom: '30px'}}>

            <InputLabel> Rating </InputLabel>

            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>

          </FormControl>

          <Grid container spacing={3} style={{height: '75vh', overflow: 'auto'}}>
            {
              places?.map((place, index) => (
                <Grid item key={index} xs={12}>
                  <PlaceDetails 
                    place={place} 
                    selected={Number(childClicked === index)}
                    refProp={elRefs[index]} 
                  />
                </Grid>
              ))
            }
          </Grid>  

          </>
        )
      }



    </div>

  )

};

export default List;