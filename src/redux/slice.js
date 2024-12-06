import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "form",
  initialState: {
    data: [],
    loading: false,
    error: false,
    success: false,
    responseData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      // post data
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.responseData = action.payload;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  },
});

export const getData = createAsyncThunk("GET/DATA", async () => {
  try {
    const response = await axios.get(
      "https://ulventech-react-exam.netlify.app/api/form"
    );
    // console.log(response,"response")
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const postData = createAsyncThunk("POST/DATA", async (data) => {
  try {
    const response = await axios.post(
      "https://ulventech-react-exam.netlify.app/api/form",
      data
    );
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const { updateData } = slice.actions;
export default slice.reducer;
