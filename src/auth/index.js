import { ACCESS_TOKEN, USER_INFO, CART } from "../constants/localStorageKeys";

export const signOut = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(USER_INFO);
  window.localStorage.removeItem("CHOOSEN")
  window.history.go(0);
};
