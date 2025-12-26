
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { complaintsApi } from '../../api/complaintsApi';
import { Complaint, ComplaintMessage } from '../../types';

interface ComplaintsState {
  list: Complaint[];
  currentComplaint: Complaint | null;
  loading: boolean;
  sending: boolean;
  activeTab: Complaint['status'];
}

const initialState: ComplaintsState = {
  list: [],
  currentComplaint: null,
  loading: false,
  sending: false,
  activeTab: 'Open',
};

export const fetchComplaints = createAsyncThunk('complaints/fetchAll', async () => {
  const response = await complaintsApi.getComplaints();
  return response.data;
});

export const fetchComplaintById = createAsyncThunk('complaints/fetchOne', async (id: string) => {
  const response = await complaintsApi.getComplaintById(id);
  return response.data;
});

export const updateStatus = createAsyncThunk(
  'complaints/updateStatus',
  async ({ id, status }: { id: string; status: Complaint['status'] }) => {
    await complaintsApi.updateComplaintStatus(id, status);
    return { id, status };
  }
);

export const sendMessage = createAsyncThunk(
  'complaints/sendMessage',
  async ({ complaintId, message }: { complaintId: string; message: Omit<ComplaintMessage, 'id' | 'time'> }) => {
    const response = await complaintsApi.addMessage(complaintId, message);
    return { complaintId, message: response.message };
  }
);

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    setComplaintsTab: (state, action) => {
      state.activeTab = action.payload;
    },
    clearCurrentComplaint: (state) => {
      state.currentComplaint = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => { state.loading = true; })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchComplaintById.pending, (state) => {
        state.loading = true;
        state.currentComplaint = null;
      })
      .addCase(fetchComplaintById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComplaint = action.payload || null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const item = state.list.find(c => c.id === action.payload.id);
        if (item) item.status = action.payload.status;
        if (state.currentComplaint?.id === action.payload.id) {
          state.currentComplaint.status = action.payload.status;
        }
      })
      .addCase(sendMessage.pending, (state) => { state.sending = true; })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        if (state.currentComplaint?.id === action.payload.complaintId) {
          state.currentComplaint.messages.push(action.payload.message);
        }
      });
  },
});

export const { setComplaintsTab, clearCurrentComplaint } = complaintsSlice.actions;
export default complaintsSlice.reducer;
