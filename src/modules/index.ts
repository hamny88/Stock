import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { takeEvery, put, call, all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import api from "../modules/api/api";

const INITIAL = "INITIAL";
const LOADING = "LOADING";
const LOADING_SUCCESS = "LOADING_SUCCESS";
const LOADING_FAILED = "LOADING_FAILED";
let stockCode: string = "";

export const GetSlice = createSlice({
  name: "GetReducer",
  initialState: {
    status: INITIAL,
    data: INITIAL,
    code: INITIAL,
  },
  reducers: {
    loading: (state: any, action) => {
      console.log("loading");
      state.status = LOADING;
      state.code = action.payload;
      stockCode = action.payload;
    },
    loading_Success: (state: any, action: any) => {
      state.status = LOADING_SUCCESS;
      state.data = action.payload;
    },
    loading_Failed: (state: any) => {
      state.status = LOADING_FAILED;
    },
  },
});

export const TrendSlice = createSlice({
  name: "TrendReducer",
  initialState: {
    status: INITIAL,
    data: INITIAL,
    code: INITIAL,
  },
  reducers: {
    Trend_loading: (state: any, action) => {
      state.status = LOADING;
    },
    Trend_Success: (state: any, action: any) => {
      state.status = LOADING_SUCCESS;
      console.log(action)
      state.data = action.payload;
      console.log(action);
    },
    Trend_Failed: (state: any) => {
      state.status = LOADING_FAILED;
    },
  },
});

export const { loading, loading_Success, loading_Failed } = GetSlice.actions;
export const {
  Trend_Failed,
  Trend_loading,
  Trend_Success,
} = TrendSlice.actions;

//Worker Saga
function* Getquote(action: any) {
  try {
    const { data } = yield call(api.getApi, stockCode);
    yield put(loading_Success(data));
  } catch (error) {
    yield put(loading_Failed());
  }
}

function* GetTrend(action:any) {
  try{
    const { trend } = yield call(api.getTrend, stockCode);
    console.log(trend)
    yield put(Trend_Success(trend));
  }catch(error) {
    yield put(Trend_Failed());
  }
}

export function* stockSaga() {
  yield takeEvery(loading, Getquote);
  yield takeEvery(Trend_loading, GetTrend);
}

function* rootSaga() {
  yield all([stockSaga()]);
}

export const getReducer = GetSlice.reducer;
export const trendReducer = TrendSlice.reducer;

export const rootReducer = combineReducers({
  getReducer,
  trendReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
