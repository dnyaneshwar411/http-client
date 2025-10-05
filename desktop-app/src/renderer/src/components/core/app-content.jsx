import { RequestContextProvider } from "../../state/request/RequestProvider";
import { URLContainer } from "../url-container";
import { URLBuilder } from "../url-builder";

export default function AppContent() {
  return <RequestContextProvider>
    <div className="grow space-y-4">
      <RequestTabBar />
      <URLContainer />
      <URLBuilder />
    </div>
  </RequestContextProvider>
}

function RequestTabBar() {
  return <div className="h-[50px] border-b-1 border-[#111111]">

  </div>
}