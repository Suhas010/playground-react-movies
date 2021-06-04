import * as React from 'react';
import { ACTIONS, COLORS, STATUS } from '../utils/constants';
import { getRandomArbitrary } from '../utils/helper';

const MoviesContext = React.createContext();

const initialMoviesState = {
  data: [],
  status: STATUS.IDLE,
  year: 2021
}

const updateData = (arr, {title,checked}) => arr.map((item) => {
  if(item.Title === title) {
    item.bookmarked = checked;
  }
  return item;
})

function MoviesProvider({ ...props}) {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {    
        case ACTIONS.MOVIES_FETCHING: {
          return {
            ...state,
            status: STATUS.PENDING,
          }
        }
        case ACTIONS.MOVIES_ERROR: {
          return {
            ...state,
            data: [],
            status: STATUS.REJECTED,
            error: action.error
          }
        }
        case ACTIONS.MOVIES_SUCCESS: {
          return {
            ...state,
            status: STATUS.RESOLVED,
            data: action.data.map((item)=> {
              item.color = COLORS[getRandomArbitrary(0, 7)]
              item.bookmarked = false;
              item.rating = getRandomArbitrary(0,5)
              return item;
            }),
          }
        }
        case ACTIONS.UPDATE_YEAR: {
          return {
            ...state,
            year: action.year
          }
        }
        case ACTIONS.TOGGLE_BOOKMARK: {
          return {
            ...state,
            data : updateData(state.data, action.payload)
          }
        }

        case ACTIONS.CLEAR_BOOKMARKED_MOVIES: {
          return {
            ...state,
            data: state.data.map((item) => {item.bookmarked = false; return item})
          }
        }
      }
    },
    initialMoviesState,
  )

  const value = [state, dispatch];
  return <MoviesContext.Provider value={value} {...props} />
}

function useMovies() {
  const context = React.useContext(MoviesContext)
  if (context === undefined) {
    throw new Error(`useMovies must be used within a MoviesProvider`)
  }
  return context
}

export {MoviesProvider, useMovies}