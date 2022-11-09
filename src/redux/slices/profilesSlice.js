import { getProfiles } from "@lib/profile";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  limit: 10,
  loading: false,
  empty: false,
  firstVisible: null,
  lastVisible: null,
  searchTerm: "",
  //   sort: "timestamp",
  //   order: "desc",
  reachedLast: false,
};

export const fetchProfilesData = createAsyncThunk(
  "profiles/fetchProfiles",
  async (payload, { getState }) => {
    const {
      profiles: { limit, lastVisible },
    } = getState();

    const res = await getProfiles({
      //   sort,
      //   order,
      limit,
      startAfter: payload?.merge ? lastVisible : null,
      ...payload,
    });

    const result = res.response;

    return { result, merge: !!payload?.merge };
  }
);

export const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setEmpty: (state, action) => {
      state.empty = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setFirstVisible: (state, action) => {
      state.firstVisible = action.payload;
    },
    setLastVisible: (state, action) => {
      state.lastVisible = action.payload;
    },
    reset: (state, action) => {
      //   state.sort = "timestamp";
      //   state.order = "desc";
      state.searchTerm = "";
      state.empty = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilesData.pending, (state) => {
        state.empty = false;
        state.reachedLast = false;
        state.loading = true;
      })
      .addCase(fetchProfilesData.fulfilled, (state, action) => {
        const result = action.payload.result;
        const merge = action.payload.merge;

        const _profiles = !merge ? result : [...state.profiles, ...result];
        state.profiles = _profiles;

        state.firstVisible = _profiles?.[0];
        state.lastVisible = _profiles?.[_profiles?.length - 1];

        if (!_profiles?.length) state.empty = true;
        if (!result?.length) state.reachedLast = true;

        state.loading = false;
      });
  },
});

export const {
  setProfiles,
  setLoading,
  setPageSize,
  setEmpty,
  setSearchTerm,
  setSort,
  setOrder,
  setFirstVisible,
  setLastVisible,
} = profilesSlice.actions;

export default profilesSlice.reducer;
