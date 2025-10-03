import { URLBuilder } from "./components/url-builder"
import { URLContainer } from "./components/url-container"
import { RequestContextProvider } from "./state/request/RequestProvider"
import { Sidebar, SidebarProvider, SidebarTrigger } from "./ui/sidebar"

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <SidebarProvider>
      <SidebarTrigger />
      <Sidebar>
      </Sidebar>
      <RequestContextProvider>
        <div className="p-4 space-y-4">
          <URLContainer />
          <URLBuilder />
        </div>
      </RequestContextProvider>
    </SidebarProvider>
  )
}

export default App
