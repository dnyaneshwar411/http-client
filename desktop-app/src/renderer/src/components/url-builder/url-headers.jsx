import { Input } from "../../ui/input"
import { TabsContent, } from "../../ui/tabs"
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "../../ui/table"
import { Minus } from "lucide-react"
import { useRequestContext } from "../../state/request/RequestProvider"
import { Checkbox } from "../../ui/checkbox"
import { useMemo } from "react"
import cn from "../../lib/cn"
import {
  headersAdd, headersRemove,
  headersSelect, headersUnselect
} from "../../state/request/reducer"

export default function URLHeaders() {
  const {
    state: {
      headers: { values },
    },
    dispatch
  } = useRequestContext()

  const allSelected = values.every(header => header.selected)
  const allIds = useMemo(() => values.map(header => header.id), [values.length])

  return <TabsContent value="headers">
    <Table className="[&_th]:border">
      <TableCaption>Headers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={allSelected}
              onCheckedChange={value => value
                ? dispatch(headersSelect(allIds))
                : dispatch(headersUnselect(allIds))
              }
            />
          </TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_td]:border">
        {values.map(header => <HeaderDetails
          key={header.id}
          header={header}
        />)}
        <HeadersStore />
      </TableBody>
    </Table>
  </TabsContent>
}

function HeaderDetails({ header }) {
  const { dispatch } = useRequestContext()

  return <TableRow
    className={cn(
      "border hover:[&_.remove-param]:opacity-100",
      (!header.selected || header.mandatory) && "opacity-50"
    )}
    key={header.id}
  >
    <TableCell className="w-9">
      <Checkbox
        onCheckedChange={value => {
          value
            ? dispatch(headersSelect([header.id]))
            : dispatch(headersUnselect([header.id]))
        }}
        checked={header.selected}
        disabled={header.mandatory}
      />
    </TableCell>
    <TableCell className="h-[40px] relative">
      <Input
        defaultValue={header.name}
        type="text"
        className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      />
    </TableCell>
    <TableCell className="h-[40px] relative">
      <Input
        defaultValue={header.value}
        type="text"
        className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      />
    </TableCell>
    <TableCell className="h-[40px] w-9 relative">
      {!header.mandatory && <Minus
        className="ml-auto cursor-pointer remove-param opacity-0"
        onClick={() => dispatch(headersRemove(header.id))}
      />}
    </TableCell>
  </TableRow>
}

function HeadersStore() {
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
        onChange={e => e.target.value.length > 0 && dispatch(headersAdd())}
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