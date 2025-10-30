import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slices/walletSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
