import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { EmployeeApi } from "./EmployeSlice";
export const store = configureStore({
  reducer: {
    [EmployeeApi.reducerPath]: EmployeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(EmployeeApi.middleware),
});
setupListeners(store.dispatch);
