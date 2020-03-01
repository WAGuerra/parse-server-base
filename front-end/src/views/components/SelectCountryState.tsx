import React, {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from 'react';
import {RequestStatus} from '../../lib/Parse/enums';
import {makeCancelable} from '../../lib/Parse/helpers';
import {
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import {useHandleError} from '../../lib/Parse/hooks/useHandleError';
import {State} from '@wladimir.guerra/sunra-library/dist/embeded/State';
import {fetchStates} from '../../lib/dataFetch';

interface CountryStatesInterface {
  onChange?: (state: State) => void,
  className?: string,
  style?: CSSProperties,
  value?: State | null,
}

export const SelectCountryState: React.FC<CountryStatesInterface> = ({
  onChange,
  value,
  ...autoCompleteProps
}) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [countryStates, setCountryStates] = useState<State[]>([]);
  const [, setRequestStatesStatus] = useState<RequestStatus>(
      RequestStatus.initializing);
  const handleError = useHandleError();
  
  useEffect(() => {
    if (inputLabel.current != null) {
      // @ts-ignore
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, []);
  
  useEffect(() => {
    setRequestStatesStatus(RequestStatus.loading);
    const [promise, cancel] = makeCancelable(fetchStates());
    promise.then(
        (response) => {
          if (response.data && response.data.estados) {
            setCountryStates(response.data.estados);
          }
          setRequestStatesStatus(RequestStatus.success);
        },
        async (error) => {
          setRequestStatesStatus(RequestStatus.fail);
          await handleError(error);
        },
    )
        .catch(async (error) => {
          setRequestStatesStatus(RequestStatus.fail);
          await handleError(error);
        });
    return () => {
      cancel();
    };
  }, [handleError]);
  
  if (!countryStates) {
    return null;
  }
  
  function handleChange(e: ChangeEvent<{ name?: string; value: unknown }>) {
    const stateIndex = parseInt(e.target.value as string);
    onChange && onChange(countryStates[stateIndex]);
  }
  
  const selectedState = value && countryStates.findIndex(state => state.nome
                                                                  === value.nome);
  
  return (
      <FormControl variant={'outlined'}
                   {...autoCompleteProps}>
        <InputLabel ref={inputLabel} htmlFor={'select-state-outlined'}>
          Estado
        </InputLabel>
        <Select
            inputProps={{
              id: 'select-state-outlined',
              name: 'estado',
              autoComplete: 'off',
            }}
            native
            value={selectedState || ''}
            onChange={handleChange}
            labelWidth={labelWidth}
        >
          <option value={''}/>
          {countryStates && countryStates.map((state, index) => (
              <option key={JSON.stringify(state)}
                      value={index}>{state.nome}</option>
          ))}
        </Select>
      </FormControl>
  );
};
