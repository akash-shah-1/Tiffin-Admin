
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchComplaints, fetchComplaintById, updateStatus, sendMessage, setComplaintsTab, clearCurrentComplaint } from '../store/slices/complaintsSlice';
import { Complaint, ComplaintMessage } from '../types';

export const useComplaints = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, currentComplaint, loading, sending, activeTab } = useSelector((state: RootState) => state.complaints);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchComplaints());
  }, [dispatch, list.length]);

  const changeTab = useCallback((tab: Complaint['status']) => dispatch(setComplaintsTab(tab)), [dispatch]);
  const getComplaint = useCallback((id: string) => dispatch(fetchComplaintById(id)), [dispatch]);
  const setComplaintStatus = useCallback((id: string, status: Complaint['status']) => dispatch(updateStatus({ id, status })), [dispatch]);
  const sendReply = useCallback((complaintId: string, text: string, isInternal: boolean = false) => {
    dispatch(sendMessage({ complaintId, message: { sender: 'Admin', text, isInternal } }));
  }, [dispatch]);
  const resetSelection = useCallback(() => dispatch(clearCurrentComplaint()), [dispatch]);

  const filtered = list.filter(c => c.status === activeTab);

  return {
    list: filtered,
    allComplaints: list,
    currentComplaint,
    loading,
    sending,
    activeTab,
    changeTab,
    getComplaint,
    setComplaintStatus,
    sendReply,
    resetSelection,
    counts: {
      open: list.filter(c => c.status === 'Open').length,
      inProgress: list.filter(c => c.status === 'In Progress').length,
      resolved: list.filter(c => c.status === 'Resolved').length
    }
  };
};
