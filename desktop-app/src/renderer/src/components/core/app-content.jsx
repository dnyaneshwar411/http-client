import { RequestContextProvider } from "../../state/request/RequestProvider";
import { URLContainer } from "../url-container";
import { URLBuilder } from "../url-builder";
import { ResizablePanel } from "../../ui/resizable";
import cn from "../../lib/cn";
import { X } from "lucide-react";

export default function AppContent() {
  return <ResizablePanel className="grow">
    <RequestContextProvider>
      <div className="grow space-y-0">
        <RequestTabBar />
        <URLContainer />
        <URLBuilder />
      </div>
    </RequestContextProvider>
  </ResizablePanel>
}

function RequestTabBar() {
  return <div className="h-[40px] border-b-1 border-[#111111] flex">
    {Array.from({ length: 4 }, (_, i) => i).map(item => <div
      key={item}
      className={cn(
        "text-sm px-4 leading-[35px] cursor-pointer relative hover:opacity-100 flex items-center gap-2 border-r-1 border-[#111111]",
        item !== 1 ? "opacity-60" : "opacity-100 font-semibold"
      )}
    >
      <p>Request Good</p>
      <X className="w-[16px] h-[16px]" />
    </div>)}
  </div>
}