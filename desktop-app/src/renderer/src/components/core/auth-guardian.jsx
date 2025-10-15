import { useEffect } from "react"
import { useGlobalContext } from "../../state/global/GlobalProvider";
import Loader from "../common/loader";
import { toast } from "sonner";
import { userLogout } from "../../state/global/reducer";
import LoggedOutScreen from "./logged-out-screen";
import VerifyOTPScreen from "./verify-otp-screen";

export default function AuthGuardian({ children }) {
  const {
    state: { user: { status } },
    dispatch
  } = useGlobalContext()

  async function init() {
    try {
      const loggedIn = await api.userSession();

      if (!loggedIn) {
        dispatch(userLogout())
        return;
      }

      const userResponse = await api.fetchData();
    } catch (error) {
      toast.error(error.message || "Failed to load Data!");
    }
  }

  useEffect(function () {
    init()
  }, [])
  console.log(status)
  if (status === "loading") return <div className="h-screen flex items-center justify-center">
    <Loader />
  </div>

  if (status === "logged-out") return <LoggedOutScreen />

  if (status === "verify-otp") return <VerifyOTPScreen />

  if (status === "logged-in") return children
}