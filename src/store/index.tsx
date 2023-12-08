// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";

import authSlice from "./auth-slice";
import themeSlice from "./theme-slice";
import sidebarSlice from "./sidebar-slice";
import { combineReducers } from "redux"; // Import combineReducers
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // Import state reconciler
import slotSlice from "./slot-slice";
import sidebarUserSlice from "./sidebar-slice-user";
import chatSlice from "./chat-slice";


// Define a rootReducer with Redux Toolkit's `createSlice` reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
  sidebar: sidebarSlice.reducer,
  sidebaruser: sidebarUserSlice.reducer,
  slot: slotSlice.reducer,
  chat: chatSlice.reducer,
});

// Configure the Redux-persist options
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"], // Persist both auth and theme slices
  stateReconciler: autoMergeLevel2, // Use autoMergeLevel2 for state reconciliation
  blacklist: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific actions
};

// Define the RootState type
type RootState = ReturnType<typeof rootReducer>;

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks
    })
    //.concat(thunk), // Add Redux Thunk middleware,
});


export const persistor = persistStore(store);

export default store;
