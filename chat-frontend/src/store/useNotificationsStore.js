import {create} from "zustand";
export const useNotificationsStore = create((set) => ({
  notifications:[],
  setNotifications:(arr) => set((state) => ({notifications:arr})) 
}));
