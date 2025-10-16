import { ResizablePanelGroup } from "../../ui/resizable";
import AppContent from "./app-content";
import SidebarOptions from "../sidebar/sidebar-options";

export default function AppWrapper() {
  return
  return <ResizablePanelGroup
    direction="horizontal"
    className="!h-screen w-full"
  >
    <SidebarOptions />
    <AppContent />
  </ResizablePanelGroup>
}