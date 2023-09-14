import {create} from "zustand";
export const useCurrentMessages = create((set) => ({
  messages:{},
  addNewMessage:(message) => set((state) => ({messages:state.messages.push(message)})) 
}));
