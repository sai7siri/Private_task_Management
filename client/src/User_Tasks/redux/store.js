
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';

import { combineReducers , configureStore } from '@reduxjs/toolkit';
const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice), // Persisting only authSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
