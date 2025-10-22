import { GlobalContextProvider } from "./state/global/GlobalProvider"
import { SidebarProvider } from "./ui/sidebar"
import { Toaster } from "./ui/sonner"
import AppWorkSpaces from "./components/core/app-workspaces"
import AuthGuardian from "./components/core/auth-guardian"
import AppSidebarContainer from "./components/core/app-sidebar-container"
import { SWRConfig } from "swr"

export default function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false
      }}
    >
      <GlobalContextProvider>
        <Toaster richColors />
        <AuthGuardian>
          <AppWorkSpaces />
          <SidebarProvider>
            <AppSidebarContainer />
          </SidebarProvider>
        </AuthGuardian>
      </GlobalContextProvider>
    </SWRConfig>
  )
}