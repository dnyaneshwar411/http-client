import { useGlobalContext } from "../../state/global/GlobalProvider"
import Loader from "../common/loader"
import AppSidebar from "../sidebar"
import AppWrapper from "./app-wrapper"

export default function AppSidebarContainer() {
  const {
    state: {
      ui: { state }
    }
  } = useGlobalContext()

  if (state === "building") return <div className="w-screen flex items-center justify-center">
    <Loader />
  </div>

  return <>
    <AppSidebar />
    <AppWrapper />
  </>
}