import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userAvatar, setUserAvatar] = useState();

  const login = useCallback((uid, token, image, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUserAvatar(image);
    //notice that due to scoping this is just a shadowed variable, it won't overwrite our state.

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // even though the code here might be hard to read and implement - thank you, Google - the logic itself, however, is quite simple
    // I'm simply making sure we know when the user logs in, so that we can log him out after one hour (please notice that I've set such expiration time in our backend for the token, so that it is indeed consistent with that)
    //
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        avatar: image,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingValidTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingValidTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.avatar,
        new Date(storedData.expiration)
      );
    }

    //technically we don't even need to use the login dependency because of the useCallback.
  }, [login]);

  return { token, login, logout, userId, userAvatar };
};
