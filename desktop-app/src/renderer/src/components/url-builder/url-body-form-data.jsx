import { urlBodyPayloadFormDataInputTypes } from "../../config/url-container";
import { TabsContent } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { useRequestContext } from "../../state/request/RequestProvider";
import { useMemo } from "react";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "../../ui/table";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue
} from "../../ui/select";
import {
  bodyFormDataAdd, bodyFormDataSelect,
  bodyFormDataUnselect, bodyFormDataUpdate
} from "../../state/request/reducer";

export default function URLBodyPayloadFormData() {
  const {
    state: {
      body: {
        formData: { values }
      }
    },
    dispatch,
  } = useRequestContext()

  const allSelected = values.every(field => field.selected)
  const allIds = useMemo(() => values.map(field => field.id), [values.length])

  return <TabsContent value="form-data">
    <Table className="[&_th]:border">
      <TableCaption>Form Data</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={allSelected}
              onCheckedChange={value => value
                ? dispatch(bodyFormDataSelect(allIds))
                : dispatch(bodyFormDataUnselect(allIds))
              }
            />
          </TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_td]:border">
        {values.map(field => <FormDataField
          key={field.id}
          field={field}
        />)}
        <FieldBodyStore />
      </TableBody>
    </Table>
  </TabsContent>
}

function FormDataField({ field }) {
  const { dispatch } = useRequestContext()
  return <TableRow className="border">
    <TableCell className="w-9">
      <Checkbox
        onCheckedChange={value => {
          value
            ? dispatch(bodyFormDataSelect([field.id]))
            : dispatch(bodyFormDataUnselect([field.id]))
        }}
        checked={field.selected}
      />
    </TableCell>
    <TableCell className="h-[40px] relative flex items-center">
      <Input
        type="text"
        className="!focus:outline-none focus:ring-0 border-0"
        value={field.name}
        onChange={e => dispatch(bodyFormDataUpdate({
          ...field,
          name: e.target.value
        }))}
      />
      <SelectInputType
        value={field.type}
        onValueChange={type => dispatch(bodyFormDataUpdate({
          ...field,
          type
        }))}
      />
    </TableCell>
    <FieldValueUpdate field={field} />
  </TableRow>
}

function FieldValueUpdate({ field }) {
  const { dispatch } = useRequestContext();
  if (field.type === "text") return <TableCell className="h-[40px] min-w-xs relative">
    <Input
      type="text"
      className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      value={field.value}
      onChange={e => dispatch(bodyFormDataUpdate({
        ...field,
        value: e.target.value
      }))}
    />
  </TableCell>

  if (field.type === "file") return <TableCell className="h-[40px] min-w-xs relative">
    <Input
      type="file"
      className="absolute h-full w-full inset-0 !focus:outline-none focus:ring-0 border-0"
      onChange={e => dispatch(bodyFormDataUpdate({
        ...field,
        file: e.target.files[0]
      }))}
    />
  </TableCell>
}

function SelectInputType({
  value,
  onValueChange
}) {
  return <Select
    value={value}
    onValueChange={onValueChange}
  >
    <SelectTrigger className="border-l-1 min-w-[120px] cursor-pointer border-0 rounded-none">
      <SelectValue placeholder="Method" />
    </SelectTrigger>
    <SelectContent className="bg-[var(--color-surface)]">
      <SelectGroup>
        {urlBodyPayloadFormDataInputTypes.map(method => <SelectItem
          value={method.value}
          key={method.id}
          className="capitalize"
        >
          {method.name}
        </SelectItem>)}
      </SelectGroup>
    </SelectContent>
  </Select>
}

function FieldBodyStore() {
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
        onChange={e => e.target.value.length > 0 && dispatch(bodyFormDataAdd())}
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
  </TableRow>
}