import { create } from "zustand";
import { FetchUsersParams, UserInfo, UserStore } from "./UserInfo";
import { TablePaginationConfig } from "antd/es/table";

const useUserInfoStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users: UserInfo[]) => {
    set({
      users: users,
    });
  },

  deleteUser: (user: UserInfo) => {
    set((state) => ({ users: state.users.filter((u) => u.id != user.id) }));
  },

  addUser: (user: UserInfo) => {
    set((state) => ({ users: [...state.users, user] }));
  },

  updateUserStore: (user: UserInfo) => {
    set((state) => ({
      users: state.users.map((u) => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      }),
    }));
  },

  pagination: {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10", "20", "30"],
    showSizeChanger: true,
    showQuickJumper: true,
    locale: {
      items_per_page: "条/页",
      jump_to: "跳转至第",
      page: "页",
    },
  },

  setPagination: (pag: TablePaginationConfig) => {
    set(() => ({
      pagination: {
        ...pag,
      },
    }));
  },

  searchParam: {
    userType: "ORDINARY_EMPLOYEES",
  },
  setSearchParam: (param: FetchUsersParams | undefined) => {
    set(() => ({
      searchParam: {
        ...param,
      },
    }));
  },
}));

export default useUserInfoStore;
