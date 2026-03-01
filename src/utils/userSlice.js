import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name: 'user',
    initialState: null,
    //in appstore.js you use reducer but In userSlice.js you use reducers dont get confused
    reducers:{
        addUser: (state, action) => 
            {
                return action.payload;
            },
      removeUser: (state, action) => {
        return null;
      },  
    },
});
export const { addUser, removeUser } = userslice.actions;
export default userslice.reducer;
