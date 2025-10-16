import { _throwError } from "../lib/helpers";
import { useGlobalContext } from "../state/global/GlobalProvider";
import { updateUserSessionStatus } from "../state/global/reducer";
import { useEffect, useState } from "react";

export function useFetch(
  endpoint,
  { defaultState = "loading" } = {}
) {
  if (!Boolean(endpoint)) _throwError("endpoint is mandatory!");
  const [state, setState] = useState(defaultState); // loading, error, fetched
  const [data, setData] = useState(null);
  const [error, setError] = useState("")

  const { dispatch } = useGlobalContext();

  async function apiFetch() {
    try {
      setState("loading")
      const response = await api.fromServer(endpoint);
      console.log(response)
      if (response.status_code === 401) {
        dispatch(updateUserSessionStatus("logged-out"));
        _throwError(response.message);
      }

      if (response.status_code !== 200) {
        _throwError(response.message)
      }

      setState("fetched")
      setData(response.data)
    } catch (error) {
      setState("error");
      setError(error.message || "Something went wrong!");
    }
  }

  useEffect(function () {
    apiFetch()
  }, [])

  return {
    state,
    data,
    error,
    refetch: apiFetch
  }
}