import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery, Rating} from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import mapStyles from './mapStyles';


const Map = ({coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData}) => {

  const isDesktop = useMediaQuery('(min-width: 600px)');

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave= () => {
    setIsHovering(false);
  };

  return (

    <div style={{height: '85vh', width: '100%', padding: '30px'}}>

      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_GOGGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
          // console.log(e)
          setCoordinates({lat: e.center.lat, lng: e.center.lng});
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
          {places?.map((place, i) => (
            <div
              style={{position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: isHovering ? 2 : 1}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {
                isDesktop ? (
                  <LocationOnOutlined color='primary' fontSize='large'/>
                ) : (
                  <Paper elevation={3} sx={{padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px'}}>

                    <Typography variant='subtitle2' gutterBottom>
                        {place.name}
                    </Typography>

                    <img 
                      style={{cursor: 'pointer'}}
                      src='https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                      alt={place.name}
                    />

                    <Rating size='small' value={Number(place.rating)} readOnly />

                  </Paper>
                )
              }
            </div>
          ))}

          {/* {
            weatherData?.list?.map((data, index) => (
              <div 
                key={index} 
                lat={data.coord.lat} 
                lng={data.coord.lon}
              >
                <img src={`https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`} height='70px' />
              </div>
            ))
          } */}
      </GoogleMapReact>
      
    </div>

  )

};

export default Map;

//<Paper> is basically a div with a background