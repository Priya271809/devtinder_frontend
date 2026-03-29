import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
reducer: {
    user: userReducer,
    feed: feedReducer,
},
});
export default appStore;
//you have to provided this store to the application so that the application use this store for that you have to go to the root of the applicationS