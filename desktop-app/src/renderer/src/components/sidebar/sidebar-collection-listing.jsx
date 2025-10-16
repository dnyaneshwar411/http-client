import { useFetch } from "../../hooks/use-fetch"

export default function SidebarCollectionListing() {
  const { state, error, data } = useFetch("/v1/collection?workspaceId=68e5194e4231f8f0422990e4")
  // console.log(state, error, data)
  return <div>
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      No collection listings
    </div>
  </div>
}