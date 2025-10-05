import AppSidebar from "./components/sidebar"
import { GlobalContextProvider } from "./state/global/GlobalProvider"
import { SidebarProvider } from "./ui/sidebar"
import AppContent from "./components/core/app-content"
import { Toaster } from "./ui/sonner"

export default function App() {
  return (
    <GlobalContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <AppContent />
        <Toaster richColors />
      </SidebarProvider>
    </GlobalContextProvider>
  )
}