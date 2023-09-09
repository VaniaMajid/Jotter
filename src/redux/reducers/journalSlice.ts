import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection, getDocs, query, where,
} from "firebase/firestore";
import { database } from "Firebase/config";

interface JournalData {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  timestamp: any;
}

interface JournalState {
  journals: JournalData[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JournalState = {
  journals: [],
  loading: "idle",
  error: null,
};

export const fetchJournals = createAsyncThunk("journal/fetchJournals", async (userId: string) => {
  const q = query(collection(database, `journals/${userId}/entries`), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const fetchedJournals: JournalData[] = [];
  querySnapshot.forEach((doc) => {
    const journalData = { id: doc.id, ...doc.data() } as JournalData;
    fetchedJournals.push({
      ...journalData,
      timestamp: journalData.timestamp.toMillis(),
    });
  });
  return fetchedJournals;
});

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournals.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.journals = action.payload;
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred while fetching journals.";
      });
  },
});

export default journalSlice.reducer;
