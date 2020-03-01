import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import Parse from 'parse';

export interface ParseState {
  user?: Parse.User,
  roles: string[]
}

export const ParseContext = createContext<[ParseState, Dispatch<any>] | undefined>(
  undefined);

interface Provider {
  reducer: Reducer<ParseState, any>,
  initialState: any,
  children: any
}

export const ParseProvider = ({reducer, initialState, children}: Provider) => (
  <ParseContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ParseContext.Provider>
);

export const useParseValues = () => useContext(ParseContext) || [
  {roles: []} as ParseState, () => {
  },
];

