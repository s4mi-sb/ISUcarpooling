import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  useReducer  from '../user/userSlice.js';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ //can use it for other reducers
    user: useReducer
})

const persistConfig = {
    key: 'root', 
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);