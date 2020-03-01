import React, {
  ChangeEvent,
  useState,
} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Grid,
  TextField,
} from '@material-ui/core';
import Parse from 'parse';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
    }),
);

interface ParseGeoPointInputInterface {
  geoPoint?: Parse.GeoPoint | null,
  
  onChange?(geoPoint: Parse.GeoPoint): any;
}

const isValidCoordinate =
    (
        coordinate: number | null | undefined,
        limit: number,
    ) =>
        (
            coordinate != null
        ) && !(
              isNaN(coordinate) || coordinate < -limit
              || coordinate > limit
          );
const isValidLatitude = (latitude: number | null | undefined) => isValidCoordinate(
    latitude,
    90,
);
const isValidLongitude = (longitude: number | null | undefined) => isValidCoordinate(
    longitude,
    180,
);

export const ParseGeoPointInput: React.FC<ParseGeoPointInputInterface> = ({
  geoPoint,
  onChange,
}) => {
  const classes = useStyles();
  const [latitudeError, setLatitudeError] = useState(false);
  const [longitudeError, setLongitudeError] = useState(false);
  
  const setGeoPoint = (coordinate: 'latitude' | 'longitude') =>
      (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        
        //TODO implementar copy paste
        // Considering that the user paste coordinates
        // like: -8.033098, -34.899062
        /*if(isNaN(parseFloat(value))){
         // Check if is a valid coodinate pair
         const coordinates = value.split(',')
         
         if(coordinates.length === 2){
         const latitude = parseFloat(coordinates[0])
         const longitude = parseFloat(coordinates[1])
         setLatitudeError(!isValidLatitude(latitude))
         setLongitudeError(!isValidLongitude(longitude))
         }
         }*/
        
        let coordinateValue: number | null = event && parseFloat(value);
        let isValid = true;
        
        switch (coordinate) {
          case 'latitude':
            isValid = isValidLatitude(coordinateValue);
            setLatitudeError(!isValidLatitude(coordinateValue));
            break;
          case 'longitude':
            isValid = isValidLongitude(coordinateValue);
            setLongitudeError(!isValidLongitude(coordinateValue));
        }
        
        if (isValid) {
          const newGeoPoint = geoPoint
                              ? new Parse.GeoPoint(geoPoint)
                              : new Parse.GeoPoint();
          
          newGeoPoint[coordinate] = coordinateValue;
          onChange && onChange(newGeoPoint);
        }
      };
  return (
      <Grid
          className={classes.container}
          container
          spacing={2}
          title={'Coordenadas Geográficas'}
      >
        <Grid item xs={12} sm>
          <TextField
              label={'Latitude'}
              variant={'outlined'}
              fullWidth
              error={latitudeError}
              type={'number'}
              helperText={'Valor entre -90˚ e +90˚'}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  step: 'any',
                },
              }}
              defaultValue={(
                                geoPoint != null && geoPoint.latitude != null
                            ) ? geoPoint.latitude : ''}
              placeholder={'-23.594949'}
              onChange={setGeoPoint('latitude')}
          />
        </Grid>
        <Grid item xs={12} sm>
          <TextField
              label={'Longitude'}
              variant={'outlined'}
              error={longitudeError}
              fullWidth
              type={'number'}
              helperText={'Valor entre -180˚ e +180˚'}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  step: 'any',
                },
              }}
              placeholder={'-46.27739'}
              defaultValue={(
                                geoPoint != null && geoPoint.longitude != null
                            ) ? geoPoint.longitude : ''}
              onChange={setGeoPoint('longitude')}
          />
        </Grid>
      </Grid>
  );
};
