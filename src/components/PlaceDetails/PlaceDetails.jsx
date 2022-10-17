import React from 'react';
import { Box, Rating, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';




const PlaceDetails = ({place, selected, refProp}) => {

  if (selected) {
    refProp?.current?.scrollIntoView({behavior: 'smooth', block:'start'});
  };

  return (

    <Card elevation={6}> 

      <CardMedia
        style={{height: 350}}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />

      <CardContent>

        <Typography gutterBottom variant='h5'>{place.name}</Typography>

        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>

        {
          place?.awards?.map((award, index) => (
            <Box 
              my={1} 
              display='flex' 
              justifyContent='space-between' 
              alignItems='center' 
              key={index}
            >
              <img src={award.images.small} alt={award.display_name} />

              <Typography variant='subtitle2' color='textSecondary'>
                {award.display_name}
              </Typography>

            </Box>
          ))
        }

        {
          place?.cuisine?.map(({name}) => (
            <Chip 
              key={name} 
              size='small' 
              label={name}
              sx={{margin: '5px 5px 5px 0'}}
            />
          ))
        }

        {
          place?.address && (
            <Typography 
              gutterBottom 
              variant='subtitle2' 
              color='textSecondary'
              sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}
            >
              <LocationOn/> {place.address}
            </Typography>
          )
        }

        {
          place?.phone && (
            <Typography 
              gutterBottom 
              variant='subtitle2' 
              color='textSecondary'
              sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}
            >
              <Phone/> {place.phone}
            </Typography>
          )
        }

        <CardActions>

          <Button 
            size='small' 
            color='primary' 
            onClick={() => window.open(place.web_url, '_blank')}
          >
            Trip Advisor
          </Button>

          <Button 
            size='small' 
            color='primary' 
            onClick={() => window.open(place.website, '_blank')}
          >
            Website
          </Button>

        </CardActions>

      </CardContent>

    </Card>

  )

};

export default PlaceDetails;

//elevation={6} gives the card a nice shadow effect.
//gutterBottom gives an extra margin at the bottom
//scrollIntoView() is a built-in method on the html element