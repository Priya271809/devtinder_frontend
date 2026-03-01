import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
reducer: {
    user: userReducer,
},
});
export default appStore;
//you have to provided this store to the application so that the application use this store for that you have to go to the root of the applicationS