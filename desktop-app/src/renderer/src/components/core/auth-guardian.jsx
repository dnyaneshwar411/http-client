import { useEffect } from "react"
import { useGlobalContext } from "../../state/global/GlobalProvider";
import Loader from "../common/loader";
import { toast } from "sonner";
import { loginUserSession, updateUserSessionStatus, userLogout } from "../../state/global/reducer";
import LoggedOutScreen from "./logged-out-screen";
import VerifyOTPScreen from "./verify-otp-screen";
import { _throwError } from "../../lib/helpers";

export default function AuthGuardian({ children }) {
  const {
    state: { user: { status } },
    dispatch
  } = useGlobalContext()

  async function init() {
    try {
      if (status === "session-created") return
      if (!["loading", "logged-in"].includes(status)) return
      const loggedIn = await api.userSession();

      if (!loggedIn) {
        dispatch(userLogout())
        return;
      }

      const userResponse = await api.fromServer("/v1/profile");
      if (userResponse.status_code === 401) {
        dispatch(updateUserSessionStatus("logged-out"))
        _throwError(userResponse.message)
      }

      if (userResponse.status_code !== 200) {
        _throwError(userResponse.message)
      }

      dispatch(loginUserSession(userResponse.data))
      toast.success("Success")
    } catch (error) {
      dispatch(updateUserSessionStatus("logged-out"))
      toast.error(error.message || "Failed to load Data!");
    }
  }

  useEffect(function () {
    init()
  }, [])

  if (status === "loading") return <div className="h-screen flex items-center justify-center">
    <Loader />
  </div>

  if (status === "logged-out") return <LoggedOutScreen />

  if (status === "verify-otp") return <VerifyOTPScreen />

  if (status === "session-created") return children
}