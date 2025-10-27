import { requestBodyOptions } from "../../config/url-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "../../ui/table"
import URLBodyPayloadFormData from "./url-body-form-data";
import URLBodyJSON from "./url-body-json";
import { useRequestContext } from "../../state/request/RequestProvider";
import { bodyUpdate } from "../../state/request/reducer";
import { useEffect } from "react";

export default function URLBody() {
  const {
    state: {
      body: { selected }
    },
    dispatch
  } = useRequestContext()
  return <TabsContent value="body">
    <Tabs
      value={selected}
      onValueChange={selected => dispatch(bodyUpdate({ selected }))}
    >
      <URLBodyHeader />
      <URLBodyJSON />
      <URLBodyPayloadFormData />
      <URLBodyPayloadURLEncoded />
    </Tabs>
  </TabsContent>
}

function URLBodyHeader() {
  return <TabsList>
    {requestBodyOptions.map((option) => (<TabsTrigger
      key={option.id}
      value={option.value}
      className="group flex items-center gap-2 px-3 py-1 rounded-md"
    >
      <span
        className="w-4 h-4 inline-flex items-center justify-center rounded-full border border-muted-foreground 
                     group-data-[state=active]:bg-primary group-data-[state=active]:border-[var(--color-accent-blue)]"
      >
        <span className="w-2 h-2 bg-[var(--color-accent-blue)] hidden group-data-[state=active]:block rounded" />
      </span>
      <span className="text-sm">{option.name}</span>
    </TabsTrigger>))}
  </TabsList>
}

function URLBodyPayloadURLEncoded() {
  return <TabsContent value="x-www-form-urlencoded">
    <Table className="[&_th]:border">
      <TableCaption>Form Urlencoded</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_td]:border">
        <TableRow className="border">
          <TableCell className="h-[40px] relative flex items-center">
            <Input
              type="text"
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
      </TableBody>
    </Table>
  </TabsContent>
}