import { Plus, Trash2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Card, CardContent } from "../../ui/card"
import { useGlobalContext } from "../../state/global/GlobalProvider"
import {
  addEnvironment, addEnvironmentVariable, deleteEnvironment,
  deleteEnvironmentVariable, updateEnvironment, updateEnvironmentVariable
} from "../../state/global/reducer"

export default function SidebarEnvironmentListing() {
  const {
    state: {
      environment: { envs }
    },
    dispatch
  } = useGlobalContext()
  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-2">
        {envs.map((env) => (
          <div
            key={env.id}
            className="flex items-start gap-2"
          >
            <EnvAccordionItem env={env} />
            <Button
              size="xs"
              variant="icon"
              onClick={() => dispatch(deleteEnvironment(env.id))}
              className="text-red-400 hover:bg-[#1a1a1a] mt-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </Accordion>
      <Button
        onClick={() => dispatch(addEnvironment())}
        variant="outline"
        className="w-full border-dashed border-[#333] hover:bg-[#111] text-gray-300"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Environment
      </Button>
    </div>
  )
}

function EnvAccordionItem({ env }) {
  const { dispatch } = useGlobalContext()
  return (
    <AccordionItem value={env.id.toString()} className="border-2 border-[#111111] bg-[#333333] rounded-lg grow">
      <AccordionTrigger className="px-4 !py-0 border-b-1 border-[#111111] rounded-none">
        <Input
          value={env.name}
          onChange={(e) => dispatch(updateEnvironment({
            ...env,
            name: e.target.value
          }))}
          className="bg-transparent w-full border-none text-base font-medium text-gray-200"
        />
      </AccordionTrigger>
      <AccordionContent className="gap-0">
        <Card className="border-none bg-transparent !px-0 !pt-4 text-gray-200">
          <CardContent className="space-y-1 gap-0 !px-2">
            {env.values.map((variable) => (
              <EnvVariableRow
                key={variable.id}
                variable={variable}
                envId={env.id}
              />
            ))}
            <Button
              onClick={() => dispatch(addEnvironmentVariable(env.id))}
              variant="outline"
              size="sm"
              className="text-gray-300 border-dashed border-[#333] w-full"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Variable
            </Button>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  )
}

function EnvVariableRow({ envId, variable }) {
  const { dispatch } = useGlobalContext()
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 space-y-1">
        <Input
          value={variable.name}
          onChange={(e) => dispatch(updateEnvironmentVariable({
            envId,
            variable: {
              ...variable,
              name: e.target.value
            }
          }))}
          placeholder="Enter variable name"
          className="!bg-[#111111] border-[#333] !text-xs"
        />
      </div>
      =
      <div className="flex-1 space-y-1">
        <Input
          value={variable.value}
          onChange={(e) => dispatch(updateEnvironmentVariable({
            envId,
            variable: {
              ...variable,
              value: e.target.value
            }
          }))}
          placeholder="Enter variable value"
          className="!bg-[#111111] border-[#333] !text-xs"
        />
      </div>

      <Button
        size="xs"
        variant="icon"
        onClick={() => dispatch(deleteEnvironmentVariable({ envId, varId: variable.id }))}
        className="text-red-400 hover:bg-[#1a1a1a]"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}