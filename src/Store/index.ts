import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { movieApi } from "../Service/movieServices";
import movieReducer from "./movieSlice";
import authReducer from "./authSlice";
import { firebaseApi } from "../Service/firebaseServices";
export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    movies: movieReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(firebaseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
