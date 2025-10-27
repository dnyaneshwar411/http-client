import { useState } from "react";
import { useFetch } from "../../hooks/use-fetch"
import { useGlobalContext } from "../../state/global/GlobalProvider"
import { ChevronDown, ChevronRight, EllipsisVertical } from "lucide-react";
import cn from "../../lib/cn";
import { charSplit } from "../../lib/formatter";
import { MethodColor } from "../../config/method";
import { requestSelection } from "../../state/global/reducer";

export default function SidebarCollectionListing() {
  const {
    state: { workspaces = [] },
  } = useGlobalContext()

  const selectedWorkspace = workspaces.find(workspace => workspace.selected);

  const { isLoading, error, data, mutate } = useFetch(
    `/v1/collection?workspaceId=${selectedWorkspace._id}`,
    "collection?workspaceId=68e5194e4231f8f0422990e4"
  )

  if (isLoading) return <>loading</>

  if (error || data.status_code !== 200) return <>{
    error?.message ||
    data.message ||
    "Something went wrong"
  }</>

  const collections = data.data

  if (collections.length === 0) return <>0  No collection listings</>

  return <div className="space-y-2">
    {collections.map(collection => <CollectionDetails
      key={collection._id}
      collection={collection}
    />)}
  </div>
}

function CollectionDetails({ collection }) {
  const [opened, setOpened] = useState(false);
  return <div className="text-md text-gray-400">
    <div className="flex items-center gap-2">
      <button
        className={cn(
          "w-full text-sm flex items-center gap-2 cursor-pointer hover:text-white",
          opened && "text-white"
        )}
        onClick={() => setOpened(prev => !prev)}
      >
        {opened
          ? <ChevronDown className="w-[16px] h-[16px]" />
          : <ChevronRight className="w-[16px] h-[16px]" />}
        {collection.name}
      </button>
      <EllipsisVertical className="w-[16px] h-[16px] cursor-pointer ml-auto" />
    </div>
    {opened && <RequestNode nodeId={collection._id} />}
  </div>
}

function RequestNode({ nodeId }) {
  const { isLoading, error, data, mutate } = useFetch(
    `/v1/collection/node?nodeId=${nodeId}`,
    `collection/node?nodeId=${nodeId}`
  )

  if (isLoading) return <>loading</>

  if (error || data.status_code !== 200) return <>
    {
      error?.message ||
      data.message ||
      "Something went wrong"
    }
  </>

  const nodes = data.data
  if (nodes.length === 0) return <>No node data found</>
  if (nodes.type === "folder") return <CollectionDetails collection={collection} />
  return <div className="pl-3 space-y-1 border-l-1 border-dashed border-[#111111]">
    {nodes.map(node => node.type === "folder"
      ? <CollectionDetails key={node._id} collection={node} />
      : <Request key={node._id} node={node} />
    )}
  </div>
}

function Request({ node }) {
  const { dispatch } = useGlobalContext();
  const { request } = node;
  const color = MethodColor[request.method] || "bg-green-600"

  return <button
    onClick={() => dispatch(requestSelection(request))}
    className="flex items-center hover:[&_.options]:opacity-100 border-l-1 border-dashed border-[#111111] pl-3 cursor-pointer hover:text-white">
    <p className={cn(
      "w-full max-w-[6ch] font-bol text-xs mr-2 text-right",
      color
    )}>{request.method}</p>
    <p className="text-xs whitespace-nowrap text-ellipsis">
      {charSplit(request.name, { words: 4 })}
    </p>
  </button>
}