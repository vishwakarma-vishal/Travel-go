import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./state"; // Import the reducer from your slice.js

export const store = configureStore({
  reducer: {
    user: userReducer // Use the userReducer directly
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
});
