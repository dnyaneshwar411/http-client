import { useGlobalContext } from "../../state/global/GlobalProvider";
import { updateUserSessionStatus } from "../../state/global/reducer";
import { Button } from "../../ui/button";

export default function LoggedOutScreen() {
  const { dispatch } = useGlobalContext()

  async function updateUserSessionStatusFlow() {
    const response = await api.externalURL("http://localhost:3000/api/auth/sign-in");
    console.log(response)
    dispatch(updateUserSessionStatus("verify-otp"))
  }

  return (<div className="flex items-center justify-center h-screen">
    <Button
      onClick={updateUserSessionStatusFlow}
    >
      Login
    </Button>
  </div>);
}