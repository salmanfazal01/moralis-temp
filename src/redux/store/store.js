import contactSlice from "@redux/slices/contactSlice";
import globalSlice from "@redux/slices/globalSlice";
import profilesSlice from "@redux/slices/profilesSlice";
import themeSlice from "@redux/slices/themeSlice";
import userSlice from "@redux/slices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  theme: themeSlice,
  user: userSlice,
  profile: contactSlice,
  profiles: profilesSlice,
  global: globalSlice,
});

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
