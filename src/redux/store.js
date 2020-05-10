import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import PAGE_ACTIONS from "./action-constants";
import NEWS_APP from "../constants/app-constants";
import axios from "axios";

export const getData = params => dispatch => {
  const url = `${NEWS_APP.API}page=${params.page}&hitsPerPage=6`;
  dispatch({ type: PAGE_ACTIONS.TOGGLE_LOADING, payload: true });
  axios
    .get(url, {})
    .then(res => {
      dispatch({
        type: PAGE_ACTIONS.GET_NEWS_DATA,
        payload: res.data
      });
    })
    .catch(error => console.error(error))
    .finally(() => {
      dispatch({ type: PAGE_ACTIONS.TOGGLE_LOADING, payload: false });
    });
};

const initialState = {
  page: 1,
  totalPages: 0,
  loading: true,
  data: {
    hits: []
  }
};

const appReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PAGE_ACTIONS.UPDATE_PAGE:
      return {
        ...state,
        page: payload
      };
    case PAGE_ACTIONS.TOGGLE_LOADING:
      return {
        ...state,
        loading: payload
      };
    case PAGE_ACTIONS.UPDATE_VOTE:
      return {
        ...state,
        data: {
          ...state.data,
          hits: state.data.hits.map(e =>
            e.objectID === payload ? { ...e, points: e.points + 1 } : e
          )
        }
      };
    case PAGE_ACTIONS.HIDE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          hits: state.data.hits.filter(element => element.objectID !== payload)
        }
      };
    case PAGE_ACTIONS.GET_NEWS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          hits: payload.hits
        },
        totalPages: payload.nbPages
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  appData: appReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
