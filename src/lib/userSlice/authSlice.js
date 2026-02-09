// features/auth/authSlice.ts
import selectedMasjid from "@/app/[id]/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userId: undefined,
  userEmail: undefined,
  isLoggedIn: false,
  selectedMasjidName:undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {

      
      state.userId = action.payload.id;
      state.userName=action.payload.userName
      state.userEmail = action.payload.userEmail;
      state.isLoggedIn = true;
    },
    logout(state) {
     
      state.userId = undefined;
      state.userEmail = undefined;
      state.isLoggedIn = false;
    },
    selectedMasjidName(state,action){
      
      state.masjid=action.payload;
    }
  },
});

export const { login, logout,selectedMasjidName } = authSlice.actions;
export default authSlice.reducer;
