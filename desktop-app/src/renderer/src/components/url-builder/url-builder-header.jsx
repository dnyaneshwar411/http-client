import { SquareTerminal } from "lucide-react";
import { requestConfigs } from "../../config/url-container";
import { Button } from "../../ui/button";
import { TabsList, TabsTrigger } from "../../ui/tabs";
import SnippetContainer from "./snippet-container";

export default function URLBuilderHeader() {
  return <div className="flex items-center justify-between">
    <TabsList className="mb-4">
      {requestConfigs.map(config => <TabsTrigger
        key={config.id}
        value={config.value}
        className="cursor-pointer data-[state=active]:!shadow-none rounded-none
                 opacity-50 data-[state=active]:opacity-100 data-[state=active]:font-bold
                 data-[state=active]:border-b-2 data-[state=active]:border-b-[var(--color-accent-orange)]"
      >
        {config.name}
      </TabsTrigger>)}

    </TabsList>
    <SnippetContainer>
      <div className="cursor-pointer data-[state=active]:!shadow-none rounded-none flex items-center gap-2
                 opacity-50 data-[state=active]:opacity-100 data-[state=active]:font-bold text-sm hover:opacity-100
                 data-[state=active]:border-b-2 data-[state=active]:border-b-[var(--color-accent-orange)]"
      >
        <SquareTerminal className="w-[16px] h-[16px]" />
        <span>Snippets</span>
      </div>
    </SnippetContainer>
  </div>
}