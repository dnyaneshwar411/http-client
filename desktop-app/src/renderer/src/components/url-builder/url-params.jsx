import { Input } from "../../ui/input"
import { TabsContent } from "../../ui/tabs"
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "../../ui/table"
import { useRequestContext } from "../../state/request/RequestProvider"
import { Checkbox } from "../../ui/checkbox"
import {
  paramsAdd, paramsRemove, paramsSelect,
  paramsUnselect, paramsUpdate
} from "../../state/request/reducer"
import cn from "../../lib/cn"
import { useMemo } from "react"
import { Minus } from "lucide-react"

export default function URLParams() {
  const {
    state: { params: { values, error } },
    dispatch
  } = useRequestContext()

  const allSelected = values.every(param => param.selected)
  const allIds = useMemo(() => values.map(param => param.id), [values.length])

  return <TabsContent value="params">
    {error.hasError && <p className="mb-2 font-bold text-[var(--color-accent-red)]">{error.message}</p>}
    <Table className="[&_th]:border">
      <TableCaption>Query Params</TableCaption>
      <TableHeader>
        <TableRow className={cn(allIds.length === 0 && "opacity-50")}>
          <TableHead>
            <Checkbox
              checked={allSelected}
              onCheckedChange={value => value
                ? dispatch(paramsSelect(allIds))
                : dispatch(paramsUnselect(allIds))
              }
            />
          </TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_td]:border">
        {values.map(param => <ParamDetails
          key={param.id}
          param={param}
        />)}
        <URLParamsStore />
      </TableBody>
    </Table>
  </TabsContent>
}

function ParamDetails({ param }) {
  const { dispatch } = useRequestContext()
  return <TableRow className={cn(
    "border hover:[&_.remove-param]:opacity-100",
    !param.selected && "opacity-50"
  )}>
    <TableCell className="w-9">
      <Checkbox
        onCheckedChange={value => {
          value
            ? dispatch(paramsSelect([param.id]))
            : dispatch(paramsUnselect([param.id]))
        }}
        checked={param.selected}
      />
    </TableCell>
    <TableCell className="h-[40px] relative">
      <Input
        type="text"
        value={param.name}
        onChange={e => dispatch(paramsUpdate({ ...param, name: e.target.value }))}
        className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      />
    </TableCell>
    <TableCell className="h-[40px] relative">
      <Input
        type="text"
        value={param.value}
        onChange={e => dispatch(paramsUpdate({ ...param, value: e.target.value }))}
        className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      />
    </TableCell>
    <TableCell className="w-[20px]">
      <Minus
        className="ml-auto cursor-pointer remove-param opacity-0"
        onClick={() => dispatch(paramsRemove(param.id))}
      />
    </TableCell>
  </TableRow>
}

function URLParamsStore() {
  const { dispatch } = useRequestContext()
  return <TableRow className="border">
    <TableCell className="w-9">
      <Checkbox disabled />
    </TableCell>
    <TableCell
      className="h-[40px] relative"
    >
      <Input
        type="text"
        onChange={e => e.target.value.length > 0 && dispatch(paramsAdd())}
        value=""
        className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      />
    </TableCell>
    <TableCell className="h-[40px] relative">
      <Input
        type="text"
        className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      />
    </TableCell>
    <TableCell></TableCell>
  </TableRow>
}