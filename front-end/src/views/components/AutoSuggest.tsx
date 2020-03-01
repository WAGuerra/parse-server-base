import React, {
  Fragment,
  useState,
} from 'react';
import {
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';
import AddIcon from '@material-ui/icons/AddCircleOutline';

interface AutoSuggestInterface {
  suggestions?: any[],
  getSuggestionLabel?: (suggestion: any) => string,
  onSelectSuggestion?: (suggestion: any) => void,
  querySuggestions: (query: string) => void,
  onAddNew?: (suggestion: string) => void,
  showAddNew?: boolean,
  loading?: boolean,
  defaultValue?: any
}

//TODO remove onChange from textfieldprops
export const AutoSuggest: React.FC<AutoSuggestInterface & TextFieldProps> = ({
  suggestions,
  getSuggestionLabel = (suggestion) => suggestion,
  onSelectSuggestion,
  querySuggestions,
  onAddNew,
  showAddNew = false,
  loading,
  value,
  ...textFieldProps
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [query, setQuery] = useState(value ? getSuggestionLabel(value) : '');
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleItemClick = (suggestion: any) => () => {
    setAnchorEl(null);
    setQuery(getSuggestionLabel(suggestion));
    onSelectSuggestion && onSelectSuggestion(suggestion);
  };
  
  return (
      <Fragment>
        <TextField
            {...textFieldProps}
            value={query}
            onChange={(event) => {
              const newQuery = event.target.value;
              setQuery(newQuery);
              querySuggestions(newQuery);
              if (newQuery.length > 0) {
                if (suggestions && suggestions.length > 0) {
                  setAnchorEl(event.currentTarget);
                }
                if (!suggestions || suggestions.length === 0) {
                  onAddNew && onAddNew(newQuery);
                }
              }
              
            }}
            InputProps={{
              endAdornment: (
                  <Fragment>
                    {(
                     !loading && showAddNew && query.length > 0 && (
                     suggestions && suggestions.length === 0
                     )
                     ) &&
                     <InputAdornment position={'end'}>
                       <AddIcon fontSize={'small'}/>
                     </InputAdornment>
                    }
                  </Fragment>
              ),
            }}
        />
        <Popper
            transition
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            placement={'bottom-start'}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper>
              <List component={'nav'}
              >
                {suggestions && suggestions.map(suggestion => (
                    <ListItem
                        button
                        key={JSON.stringify(suggestion)}
                        onClick={handleItemClick(suggestion)}
                        selected={value === suggestion}
                    >
                      <Typography noWrap>
                        {getSuggestionLabel(suggestion)}
                      </Typography>
                    </ListItem>
                ))
                }
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Fragment>
  );
};
