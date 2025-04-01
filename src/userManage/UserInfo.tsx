import { TablePaginationConfig } from "antd/es/table";

export type UserInfo = {
  id?: number;
  userName?: string;
  phoneNumber?: string;
  email?: string;
  nickName?: string;
  password?: string;
  departmentId?: number;
  directSupervisorId?: number;
  status?: string;
  userType?: string;
  loginMethod?: string;
  createTime?: number;
  updateTime?: number;
};

export type FetchUsersParams = {
  userName?: string;
  phoneNumber?: string;
  userType?: string;
};

export interface UserStore {
  users: UserInfo[];
  setUsers: (users: UserInfo[]) => void;
  deleteUser: (user: UserInfo) => void;
  addUser: (user: UserInfo) => void;
  updateUserStore: (user: UserInfo) => void;

  pagination: TablePaginationConfig;
  setPagination: (pagination: TablePaginationConfig) => void;

  searchParam: FetchUsersParams;
  setSearchParam: (param: FetchUsersParams | undefined) => void;
}

export const SUCCESS_CODE = "E00000000";
