import { OPTION_BAR_SIZE } from "../../config/sidebar";
import { useGlobalContext } from "../../state/global/GlobalProvider";
import { ResizablePanel } from "../../ui/resizable";
import SidebarCollectionListing from "./sidebar-collection-listing";
import SidebarEnvironmentListing from "./sidebar-env-listing";

export default function SidebarOptions() {
  const {
    state: {
      sidebar: { state, selected }
    }
  } = useGlobalContext();
  const size = state === "collapsed" ? 0 : OPTION_BAR_SIZE;
  const Component = selectComponent(selected)
  return <ResizablePanel
    minSize={size}
    maxSize={size}
    className="bg-[#222222] border-r-1 border-[#111111]"
  >
    <div>
      <div className="h-[40px] border-b-1 border-[#111111] flex items-center justify-center capitalize">
        {selected}
      </div>
      <div className="pt-8 px-4">
        <Component />
      </div>
    </div>
  </ResizablePanel>
}

function selectComponent(selected) {
  switch (selected) {
    case "collection":
      return SidebarCollectionListing;
    case "environment":
      return SidebarEnvironmentListing;
    default:
      return CollectionListing;
  }
}