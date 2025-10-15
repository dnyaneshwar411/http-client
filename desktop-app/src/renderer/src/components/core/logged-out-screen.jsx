import { useGlobalContext } from "../../state/global/GlobalProvider";
import { startLogin } from "../../state/global/reducer";
import { Button } from "../../ui/button";

export default function LoggedOutScreen() {
  const { dispatch } = useGlobalContext()

  async function startLoginFlow() {
    const response = await api.externalURL("http://localhost:3000/api/auth/sign-in");
    console.log(response)
    dispatch(startLogin())
  }

  return (<div className="flex items-center justify-center h-screen">
    <Button
      onClick={startLoginFlow}
    >
      Login
    </Button>
  </div>);
}