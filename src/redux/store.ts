import { configureStore } from "@reduxjs/toolkit";

//Ver más adelante
export const store = configureStore({
  reducer: {
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
