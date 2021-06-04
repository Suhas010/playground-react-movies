import moment from 'moment';
import * as React from 'react';
import { ACTIONS, COLORS, STATUS } from '../utils/constants';
import { getRandomArbitrary } from '../utils/helper';

const MoviesContext = React.createContext();

const initialMoviesState = {
  data: [],
  bookmarked: [],
  status: STATUS.IDLE,
  year: 2021
}

const updateData = ({data, bookmarked}, {title,checked}) => {
  let copyOfBookmarked = [...bookmarked];
  let resu = data.map((item, i) => {
    if(item.Title === title) {
      item.bookmarked = checked;
      if(checked) {
        copyOfBookmarked.push({...item, time: moment()});
      } else {
        copyOfBookmarked.splice(copyOfBookmarked.findIndex(({Title}) => Title === title),1)
      }
    }
    return item;
  })
  return {data: resu, bookmarked: copyOfBookmarked};
}

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
              if(state.bookmarked.findIndex(({Title}) => Title === item.Title)>-1){
                item.bookmarked = true;
              }
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
          let {data, bookmarked} = updateData(state, action.payload);
          console.log(bookmarked,"Bookmarked")
          return {
            ...state,
            data: data,
            bookmarked: bookmarked
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