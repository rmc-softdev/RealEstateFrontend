import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  //we need to make sure to not create the same object again by using useCallback
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrll = new AbortController();

      activeHttpRequests.current.push(httpAbortCtrll);

      try {
        const response = await fetch(url, {
          //not using the shortening syntax just so the future reader can be aware of the idea behind it more easily
          method: method,
          body: body,
          headers: headers,
          signal: httpAbortCtrll.signal,
          //this feature is built in modern browsers, I'm leaving it here so we can manage some naughty stages, for example, where the user has gotten out of the page without it loading the request properly
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
