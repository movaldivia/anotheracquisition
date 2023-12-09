import Cookies from "js-cookie";
import differenceInDays from "date-fns/differenceInDays";
import eventlyAPI from "./apiClient";
import { throwErrorMessage } from "./errors";
import fromUnixTime from "date-fns/fromUnixTime";

export const getHeaderExpiry = (response) =>
  fromUnixTime(response.headers.expiry);

export const setAuthCredentials = (response) => {
  const expiryDate = getHeaderExpiry(response);
  Cookies.set("cw_d_session_info", JSON.stringify(response.headers), {
    expires: differenceInDays(expiryDate, new Date()),
  });
};

export const signIn = async (creds) => {
  try {
    const response = await eventlyAPI.post("auth/sign_in", creds);
    setAuthCredentials(response);
  } catch (error) {
    throwErrorMessage(error);
  }
};

export const signUp = async (creds) => {
  try {
    const response = await eventlyAPI.post("auth", {
      email: creds.email,
      password: creds.password,
    });
    setAuthCredentials(response);
    return response.data;
  } catch (error) {
    throwErrorMessage(error);
  }
  return null;
};

export const clearBrowserSessionCookies = () => {
  Cookies.remove("cw_d_session_info");
};

export const clearCookiesOnLogout = () => {
  clearBrowserSessionCookies();
  window.location = "/";
};
