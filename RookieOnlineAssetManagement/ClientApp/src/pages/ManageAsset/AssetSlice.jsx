import assetApi from "api/assetAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const asset = createSlice({
    name: "assets",
    initialState: { loading: false, assets: []},
    reducers: {
        loadAsset: (state, action) => {
            state.assets = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAssets.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAssets.fulfilled,  (state, action) => {
                state.loading = false;
                state.assets = action.payload;
                state.categories = action.payload;
            })
            .addCase(fetchAssets.rejected,  (state, action) => {
                state.loading = false;
                state.assets = [];
                state.categories = [];
            })
    }
})
const { reducer, actions } = asset;
export const { loadAsset } = actions;
export default reducer;

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async (data,thunkAPI) => {
    const res = await assetApi.getListAsset(data.currentPage, data.strFilterByState, data.strFilterByCategory, data.searchString, data.sort, data.sortBy);
    return res.assetList;
})