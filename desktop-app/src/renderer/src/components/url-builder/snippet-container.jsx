"use client"
import { useGlobalContext } from "../../state/global/GlobalProvider"
import cn from "../../lib/cn"
import { updateCodeSnippetOption } from "../../state/global/reducer"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { SNIPPETS } from "../../config/code-snippet"
import { Button } from "../../ui/button"
import { useRequestContext } from "../../state/request/RequestProvider"
import { generateCurl, generateJSFetch, generateJSAxios, generateJSXHR, generateNodeJSNative } from "../../lib/code-snippets"
import { Clipboard, Copy } from "lucide-react"
import { copyText } from "../../lib/helpers"
import { toast } from "sonner"

export default function SnippetContainer({ children }) {
  return <Sheet>
    <SheetTrigger>
      {children}
    </SheetTrigger>
    <SheetContent className="bg-[#222222]">
      <div>
        <SheetHeader>
          <SheetTitle>Code Snippets</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <SelectCodeSnippetOptions />
          <SNIPPETcURL />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
}

function SelectCodeSnippetOptions() {
  const {
    state: {
      sidebar: {
        snippet: { selected }
      }
    },
    dispatch
  } = useGlobalContext()
  return <Select
    value={selected}
    onValueChange={value => dispatch(updateCodeSnippetOption(value))}
    className="w-full"
  >
    <SelectTrigger className="min-w-[140px] w-full !bg-[var(--color-surface)] cursor-pointer">
      <SelectValue placeholder="Method" />
    </SelectTrigger>
    <SelectContent className="bg-[var(--color-surface)]">
      <SelectGroup>
        {SNIPPETS.map(snippet => <SelectItem
          value={snippet.value}
          key={snippet.id}
          className={cn("capitalize", selected === snippet.value ? "font-bold" : "opacity-40")}
        >
          {snippet.name}
        </SelectItem>)}
      </SelectGroup>
    </SelectContent>
  </Select>
}

function SNIPPETcURL() {
  const { state } = useRequestContext();
  const { state: {
    sidebar: { snippet: { selected } }
  } } = useGlobalContext()

  const code = generateSnippetString(
    selected,
    {
      method: state.method.value,
      url: state.url.value,
      headers: state.headers,
      body: state.body,
      params: state.params.values,
      authorization: state.authorization
    }
  );

  return <div className="relative bg-[#191919] min-h-[200px] text-xs font-light px-4 py-2 border
                       border-[#333333] rounded-[6px] opacity-80 whitespace-pre-wrap overflow-x-auto">
    <pre className="whitespace-pre-wrap break-words">
      <code>{code}</code>
    </pre>

    <Button
      variant="icon"
      className="absolute bg-[#111111] right-2 bottom-2 border border-[#333333] opacity-40 hover:opacity-100"
      size="sm"
      onClick={() => {
        copyText(code)
        toast.success("Snippet Copied")
      }}
    >
      <Clipboard className="h-[16px] w-[16px]" />
    </Button>
  </div>
}

function generateSnippetString(selected, config) {
  switch (selected) {
    case "curl":
      return generateCurl(config)
    case "javascript-fetch":
      return generateJSFetch(config)
    case "nodejs-axios":
      return generateJSAxios(config)
    case "javascript-xhr":
      return generateJSXHR(config)
    case "nodejs-native":
      return generateNodeJSNative(config)

    default:
      return "N/A";
  }
}