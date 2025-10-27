import { RequestContextProvider } from "../../state/request/RequestProvider";
import { URLContainer } from "../url-container";
import { URLBuilder } from "../url-builder";
import { ResizablePanel } from "../../ui/resizable";
import cn from "../../lib/cn";
import { X } from "lucide-react";
import { useGlobalContext } from "../../state/global/GlobalProvider";
import { MethodColor } from "../../config/method";
import { requestCurrentSelection, requestUnselection } from "../../state/global/reducer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { requestPayload } from "../../state/request/reducer";

export default function AppContent() {
  return <ResizablePanel className="grow">
    <div className="grow space-y-0">
      <RequestTabBar />
    </div>
  </ResizablePanel>
}

function RequestTabBar() {
  const {
    state: {
      requests: { current }
    },
    dispatch
  } = useGlobalContext()
  return <div className="h-[40px] border-b-1 border-[#111111] flex w-full">
    <Tabs
      value={current}
      onValueChange={value => dispatch(requestCurrentSelection(value))}
      className="w-full"
    >
      <TabsListContainer />
      <TabsRequestsContainer />
    </Tabs>
  </div>
}

function TabsListContainer() {
  const {
    state: {
      requests: {
        current, selected
      }
    },
    dispatch
  } = useGlobalContext()
  return <TabsList className="divide-x-1 divide-[#111111]">
    {selected.map(request => <div
      key={request._id}
      className="px-4 flex items-center gap-1"
    >
      <TabsTrigger
        value={request._id}
        className={cn(
          "text-sm leading-[35px] cursor-pointer relative hover:opacity-100 flex items-center border-r-1 border-[#111111]",
          request._id === current ? "!opacity-100" : "opacity-40",
          MethodColor[request.method]
        )}
      >
        <p className="max-w-[20ch] truncate text-ellipsis">{request.name}</p>
      </TabsTrigger>
      <X
        className="w-[16px] h-[16px] cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          dispatch(requestUnselection(request._id))
        }}
      />
    </div>)}
  </TabsList>
}

function TabsRequestsContainer() {
  const {
    state: {
      requests: { selected }
    },
  } = useGlobalContext()
  return <div>
    {selected.map(request => <TabsContent
      value={request._id}
    >
      <RequestContextProvider
        config={requestPayload(request)}
      >
        <URLContainer />
        <URLBuilder />
      </RequestContextProvider>
    </TabsContent>)}
  </div>
}