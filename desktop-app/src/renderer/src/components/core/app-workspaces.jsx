import { useEffect } from "react"
import { useFetch } from "../../hooks/use-fetch"
import { Button } from "../../ui/button"
import { useGlobalContext } from "../../state/global/GlobalProvider"
import { workspaceSelection, workspacesFetched } from "../../state/global/reducer"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

export default function AppWorkSpaces() {
  return <div className="h-[50px] border-b-1 py-2 px-4 leading-[35px] bg-[#222222] border-[#111111] z-[11] sticky top-0">
    <AppWorkSpacesContainer />
  </div>
}

export function AppWorkSpacesContainer() {
  const {
    dispatch,
    state: { workspaces }
  } = useGlobalContext()

  const { isLoading, error, data, mutate } = useFetch(
    "v1/workspace", "v1/workspace"
  )

  useEffect(function () {
    if (data?.status_code !== 200) return
    dispatch(workspacesFetched(data.data))
  }, [data])

  if (isLoading) return <>loading</>

  if (error || data.status_code !== 200) return <>{error.message || "Something webt wrong"}</>

  if (workspaces.length === 0) return <>0 workspaces</>

  const selectedWorkspace = workspaces
    ?.find(workspace => workspace.selected)

  return <Select
    value={selectedWorkspace._id}
    onValueChange={value => dispatch(workspaceSelection(value))}
  >
    <SelectTrigger className="min-w-[140px] !bg-[var(--color-surface)] cursor-pointer">
      <SelectValue placeholder="Method" />
    </SelectTrigger>
    <SelectContent className="bg-[var(--color-surface)]">
      <SelectGroup>
        {workspaces.map(workspace => <SelectItem
          value={workspace._id}
          key={workspace._id}
        >
          {workspace.name}
        </SelectItem>)}
      </SelectGroup>
    </SelectContent>
  </Select>
}