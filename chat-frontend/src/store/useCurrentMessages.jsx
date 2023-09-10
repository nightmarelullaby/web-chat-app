import {create} from "zustand";
export const useCurrentMessages = create((set) => ({
  newMessage:{},
  setNewMessage:(message) => set((state) => ({messages:message})) 
}));
