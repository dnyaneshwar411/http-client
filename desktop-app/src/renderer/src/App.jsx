import AppSidebar from "./components/sidebar"
import { GlobalContextProvider } from "./state/global/GlobalProvider"
import { SidebarProvider } from "./ui/sidebar"
import { Toaster } from "./ui/sonner"
import AppWrapper from "./components/core/app-wrapper"
import AppWorkSpaces from "./components/core/app-workspaces"
import AuthGuardian from "./components/core/auth-guardian"

export default function App() {
  return (
    <GlobalContextProvider>
      <Toaster richColors />
      <AuthGuardian>
        <AppWorkSpaces />
        <SidebarProvider>
          <AppSidebar />
          <AppWrapper />
        </SidebarProvider>
      </AuthGuardian>
    </GlobalContextProvider>
  )
}