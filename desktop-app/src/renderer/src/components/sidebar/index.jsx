"use client"
import { CodeXml } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "../../ui/sidebar"
import { useGlobalContext } from "../../state/global/GlobalProvider"
import cn from "../../lib/cn"
import { updateSidebarSelectedItem } from "../../state/global/reducer"
import { SIDEBAR_ITEMS } from "../../config/sidebar"

export default function AppSidebar() {
  return <Sidebar className="w-[60px] bg-[#222222] border-[#111111] border-r-1">
    <div className="h-[50px]" />
    <SidebarHeader className="h-[40px] border-b-1 border-[#111111] mb-6 flex items-center justify-center">
      <CodeXml />
    </SidebarHeader>
    <SidebarOptions />
  </Sidebar>
}

function SidebarOptions() {
  const {
    state: {
      sidebar: { selected }
    },
    dispatch
  } = useGlobalContext()
  return <SidebarContent>
    <SidebarMenu className="space-y-2">
      {SIDEBAR_ITEMS.map(({ icon: Icon, label }, i) => (
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
      ))}
    </SidebarMenu>
  </SidebarContent>
}