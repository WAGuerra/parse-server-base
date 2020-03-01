import React, {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useState,
} from 'react';
import {City} from '@wladimir.guerra/sunra-library';
import {RenderInputParams} from '@material-ui/lab/Autocomplete';
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import Parse from 'parse';
import {useSnackbar} from 'notistack';
import {useHandleError} from '../../lib/Parse/hooks/useHandleError';
import {State} from '@wladimir.guerra/sunra-library/dist/embeded/State';
import {makeCancelable} from '../../lib/Parse/helpers';
import {fetchStates} from '../../lib/dataFetch';

interface SelectCityInterface {
  state?: State | null,
  onSelect: (city: City | null) => void,
  className?: string,
  disabled?: boolean,
  style?: CSSProperties,
  city?: string | null
}

/**
 *
 * @param state The state to list cities.
 * @param onSelect A callback that takes a selected City or a new City if it is
 *     not found on database. The new city is not saved by default.
 * @param city
 * @param autocompleteProps
 * @constructor
 */
export const SelectCity: React.FC<SelectCityInterface> = ({
  state,
  onSelect,
  city,
  ...autocompleteProps
}) => {
  const {enqueueSnackbar} = useSnackbar();
  const handleError = useHandleError();
  const [cities, setCities] = useState<string[]>((
                                                     state && state.cidades
                                                 ) ? state.cidades : []);
  
  useEffect(() => {
    // If state cities is not loaded loads it
    if (state == null) {
      return;
    }
    
    const [promise, cancel] = makeCancelable(fetchStates());
    promise.then(
        (fetched) => {
          const foundedState: State = fetched.data.estados.find((fetchedState: State) => fetchedState.nome
                                                                                         === state.nome);
          setCities(foundedState.cidades || []);
        },
    );
    
    return () => {
      cancel();
    };
  }, [cities.length, state]);
  
  const handleOnChange = async (event: ChangeEvent<{}>, newValue: string) => {
    if (!state) {
      enqueueSnackbar('É preciso selecionar um estado.', {variant: 'warning'});
      return;
    }
    
    const cityQuery = new Parse.Query<City>(City.documentName);
    cityQuery
        .equalTo(City.nameKeyName, newValue);
    cityQuery.first()
        .then(
            (city) => {
              
              if (city) {
                onSelect && onSelect(city);
              } else {
                const city = new City();
                city.name = newValue;
                const {cidades, ...cityState} = state;
                city.state = cityState;
                city.stateAbbreviation = state.sigla;
                onSelect(city);
              }
            },
        )
        .catch(handleError);
  };
  
  return (
      <Autocomplete
          {...autocompleteProps}
          options={cities}
          getOptionLabel={(option) => option || ''}
          value={city || ''}
          onChange={handleOnChange}
          renderInput={(params: RenderInputParams) => (
              <TextField
                  {...params}
                  variant={'outlined'}
                  label={'Cidade'}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: 'off',
                  }}
              />
          )}
      />
  );
};
