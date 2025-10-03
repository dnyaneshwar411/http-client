import { requestConfigs } from "../../config/url-container";
import { TabsList, TabsTrigger } from "../../ui/tabs";

export default function URLBuilderHeader() {
  return <TabsList className="mb-4">
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
}