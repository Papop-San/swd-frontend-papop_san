import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataType {
  key: string;
  title?: string;
  firstname?: string;
  lastname?: string;
  birth_day?: string;
  nationality?: string;
  citizen_id?: string;
  gender: "Male" | "Female" | "Other";
  country_code: string;
  phone_number: string;
  passport: string;
  except_salary: number;
}

interface UserState {
  users: DataType[];
  selectedKeys: React.Key[];
}

const LOCAL_STORAGE_KEY = "users_data";
let savedUsers: DataType[] = [];

if (typeof window !== "undefined") {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      savedUsers = JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse users from localStorage:", err);
      savedUsers = [];
    }
  }
}

const initialState: UserState = {
  users: savedUsers,
  selectedKeys: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<DataType[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<DataType>) {
      state.users.push(action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
    },
    updateUser(state, action: PayloadAction<DataType>) {
      const idx = state.users.findIndex(u => u.key === action.payload.key);
      if (idx >= 0) {
        state.users[idx] = action.payload;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
      }
    },
    deleteUser(state, action: PayloadAction<React.Key>) {
      state.users = state.users.filter(u => u.key !== action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
    },
    deleteSelectedUsers(state) {
      state.users = state.users.filter(u => !state.selectedKeys.includes(u.key));
      state.selectedKeys = [];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.users));
    },
    setSelectedKeys(state, action: PayloadAction<React.Key[]>) {
      state.selectedKeys = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser, deleteSelectedUsers, setSelectedKeys } = userSlice.actions;

export default userSlice.reducer;
