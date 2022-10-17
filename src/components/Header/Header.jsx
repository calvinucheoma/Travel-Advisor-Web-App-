import React, { useState } from 'react';
import {Autocomplete} from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, Box, InputBase} from '@mui/material';
import { Search } from '@mui/icons-material';
// import useStyles from './styles';


const Header = ({setCoordinates}) => {

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    
    setCoordinates({lat, lng});
  };


  return (

    <AppBar position='static'>

        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'blue'}}>

            <Typography variant='h5' >
                Travel Advisor
            </Typography>

            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>

                <Typography variant='h6' sx={{marginRight: '20px'}}>
                    Explore New Places
                </Typography>

                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

                    <div style={{width: '50%', display: 'flex', backgroundColor: 'white', marginRight: '10px', alignItems: 'center', justifyContent: 'center', borderRadius: '30px', padding: '3px'}}>

                        <div style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 2px'}}>
                            <Search sx={{color: 'gray'}}/>
                        </div>

                        <InputBase 
                            placeholder='Search...' 
                            sx={{color: 'black', padding: '0px 3px', border: 'none', outline: 'none' }}
                        />

                    </div>

                </Autocomplete>

            </Box>

        </Toolbar>

    </AppBar>

  )

};


export default Header;

//we have to connect our <autoComplete> to the google maps api by writing a <script> tag information in our public index.html file
//Then we use our own Api key inside the <script> tag