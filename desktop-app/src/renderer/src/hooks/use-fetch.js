import useSWR from "swr";
import { _throwError } from "../lib/helpers";
import { useGlobalContext } from "../state/global/GlobalProvider";
import { updateUserSessionStatus } from "../state/global/reducer";

export function useFetch(
  endpoint,
  fetchKey,
  { } = {}
) {
  if (!Boolean(endpoint)) _throwError("endpoint is mandatory!");
  const { isLoading, error, data, mutate } = useSWR(
    fetchKey,
    apiFetch
  )

  const { dispatch } = useGlobalContext();

  async function apiFetch() {
    try {
      const response = await api.fromServer(endpoint);

      if (response.status_code === 401) {
        dispatch(updateUserSessionStatus("logged-out"));
        _throwError(response.message);

      }

      if (response.status_code !== 200) {
        _throwError(response.message)
      }

      return response;
    } catch (error) {
      return error
    }
  }

  return {
    isLoading,
    error,
    data,
    mutate
  }
}