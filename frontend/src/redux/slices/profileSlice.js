import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user:null
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser : function(state,action) {
            state.user = action.payload;
        },
    }
})

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;