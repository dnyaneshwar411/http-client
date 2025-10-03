import { authorizationOptions } from "../../config/url-container";
import { TabsContent } from "../../ui/tabs";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue
} from "../../ui/select";
import { useRequestContext } from "../../state/request/RequestProvider";
import { authorizationUpdate } from "../../state/request/reducer";
import cn from "../../lib/cn";
import URLAuthorizationTypeContainer from "./url-authorization-type-container";

export default function URLAuthorization() {
  return <TabsContent
    value="authorization"
  >
    <div className="w-full min-h-[640px] flex items-stretch">
      <URLAuthorizationSelection />
      <URLAuthorizationTypeContainer />
    </div>
  </TabsContent>
}

function URLAuthorizationSelection() {
  const {
    state: { authorization: { selected } },
    dispatch
  } = useRequestContext();
  return <div className="w-[30%] pr-4 border-r-1">
    <Select
      value={selected}
      onValueChange={selected => dispatch(authorizationUpdate({ selected }))}
      className="w-full"
    >
      <SelectTrigger className="min-w-[140px] w-full !bg-[var(--color-surface)] cursor-pointer">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent className="bg-[var(--color-surface)]">
        <SelectGroup>
          {authorizationOptions.map(method => <SelectItem
            value={method.value}
            key={method.id}
            className={cn("capitalize", selected === method.value ? "font-bold" : "opacity-40")}
          >
            {method.name}
          </SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
}

