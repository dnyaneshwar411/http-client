"use client"
import { CodeXml } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "../../ui/sidebar"
import { useGlobalContext } from "../../state/global/GlobalProvider"
import cn from "../../lib/cn"
import { updateSidebarSelectedItem } from "../../state/global/reducer"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"
import { Button } from "../../ui/button"
import SnippetContainer from "../url-builder/snippet-container"
import { SIDEBAR_ITEMS } from "../../config/sidebar"

export default function AppSidebar() {
  return <Sidebar className="w-[60px] bg-[#222222] border-[#111111] border-r-1">
    <SidebarHeader className="h-[50px] border-b-1 border-[#111111] mb-6 flex items-center justify-center">
      <CodeXml />
    </SidebarHeader>
    <SidebarOptions />
  </Sidebar>
}

function SidebarOptions() {
  return <SidebarContent>
    <SidebarMenu className="space-y-2">
      {SIDEBAR_ITEMS.map(({ icon: Icon, label }, i) => (<SidebarItem
        key={i}
        Icon={Icon}
        label={label}
        i={i}
      />))}
      <SidebarDrawer />
    </SidebarMenu>
  </SidebarContent>
}

function SidebarItem({ Icon, label, i }) {
  const {
    state: {
      sidebar: { selected }
    },
    dispatch
  } = useGlobalContext()
  return <SidebarDrawer>
    <SidebarMenuItem
      key={i}
      className={cn(
        "hover:bg-[#1111118F] h-12 flex items-center justify-center mx-[6px] rounded-[6px]",
        selected === label && "bg-[#1111118F]"
      )}
      title={label}
      onClick={() => dispatch(updateSidebarSelectedItem(label))}
    >
      <Icon
        className="block mx-auto cursor-pointer opacity-40"
        strokeWidth={1.2}
      />
    </SidebarMenuItem>
  </SidebarDrawer>
}


function SidebarDrawer({ children }) {
  const {
    state: {
      sidebar: { selected }
    }
  } = useGlobalContext()
  const Component = selectComponent(selected)
  return <Sheet>
    <SheetTrigger>
      {children}
    </SheetTrigger>
    <SheetContent className="bg-[#222222]">
      <Component />
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
}

function CollectionListing() {
  return <div>
    <SheetHeader>
      <SheetTitle>Collections</SheetTitle>
    </SheetHeader>
    <div className="grid flex-1 auto-rows-min gap-6 px-4">

    </div>
  </div>
}

function EnvironmentListing() {
  return <div>
    <SheetHeader>
      <SheetTitle>Environment</SheetTitle>
    </SheetHeader>
    <div className="grid flex-1 auto-rows-min gap-6 px-4">

    </div>
  </div>
}

function selectComponent(selected) {
  switch (selected) {
    case "collection":
      return CollectionListing
    case "environment":
      return EnvironmentListing
    case "snippet":
      return SnippetContainer
    default:
      return CollectionListing;
  }
}