import { methods } from "../../config/url-container";
import { changeMethod, changeURL } from "../../state/request/reducer";
import { useRequestContext } from "../../state/request/RequestProvider";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue
} from "../../ui/select";
import cn from '../../lib/cn';
import { buildRequestURL } from "../../../../services/request-builder";

function URLContainer() {
  const { state } = useRequestContext()

  async function sendRequest() {
    const api = await window.api.fromServer("collection", { params: { userId: "68e4014d94f556f086cf0afd", workspaceId: "68e5194e4231f8f0422990e4" } })
    // const data = await window.api.request(state)
  }

  return <div className="mt-4 px-4 py-2 flex items-center gap-4">
    <SelectMethod />
    <URLEndpoint />
    <Button
      className="!font-bold"
      onClick={sendRequest}
    >
      Send</Button>
  </div>
}

function SelectMethod() {
  const {
    state: { method: { value, error } },
    dispatch
  } = useRequestContext();
  return <Select
    value={value}
    onValueChange={method => dispatch(changeMethod({ value: method, error }))}
  >
    <SelectTrigger className="min-w-[140px] !bg-[var(--color-surface)] cursor-pointer">
      <SelectValue placeholder="Method" />
    </SelectTrigger>
    <SelectContent className="bg-[var(--color-surface)]">
      <SelectGroup>
        {methods.map(method => <SelectItem
          value={method.value}
          key={method.id}
          className=""
        >
          {method.name}
        </SelectItem>)}
      </SelectGroup>
    </SelectContent>
  </Select>
}

function URLEndpoint() {
  const {
    state: {
      url: { value: urlValue, error },
      params: { values: params }
    },
    dispatch
  } = useRequestContext();

  const endpoint = buildRequestURL(urlValue, params)

  return <Input
    className={cn(
      "!bg-[var(--color-surface)]",
      error.hasError && "border-1 border-[var(--color-accent-red)]"
    )}
    placeholder="URL"
    value={endpoint}
    onChange={e => dispatch(changeURL({
      value: e.target.value,
      error: e.target.value.length === 0
        ? {
          hasError: true,
          message: "URL should should have at least 4 characters!"
        }
        : {
          hasError: false,
          message: ""
        }
    }))}
  />
}

export {
  URLContainer
}