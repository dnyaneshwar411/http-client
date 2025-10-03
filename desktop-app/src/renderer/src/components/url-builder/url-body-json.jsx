import { useRequestContext } from "../../state/request/RequestProvider"
import { TabsContent } from "../../ui/tabs"
import { Textarea } from "../../ui/textarea"
import { bodyJSONUpdate } from "../../state/request/reducer"

export default function URLBodyJSON() {
  const {
    state: {
      body: {
        json: { values }
      }
    },
    dispatch
  } = useRequestContext()

  return (
    <TabsContent value="json">
      <Textarea
        value={values}
        onChange={e => dispatch(bodyJSONUpdate((e.target.value)))}
      />
    </TabsContent>
  )
}
