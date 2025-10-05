import AppSidebar from "./components/sidebar"
import { GlobalContextProvider } from "./state/global/GlobalProvider"
import { SidebarProvider } from "./ui/sidebar"
import { Toaster } from "./ui/sonner"
import AppWrapper from "./components/core/app-wrapper"
import AppWorkSpaces from "./components/core/app-workspaces"

export default function App() {
  return (
    <GlobalContextProvider>
      <AppWorkSpaces />
      <SidebarProvider>
        <AppSidebar />
        <AppWrapper />
        <Toaster richColors />
      </SidebarProvider>
    </GlobalContextProvider>
  )
}