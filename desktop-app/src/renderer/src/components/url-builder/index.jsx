import { Tabs } from "../../ui/tabs"
import URLAuthorization from "./url-authorization"
import URLBody from "./url-body"
import URLBuilderHeader from "./url-builder-header"
import URLHeaders from "./url-headers"
import URLParams from "./url-params"

function URLBuilder() {
  return <div>
    <Tabs defaultValue="params">
      <URLBuilderHeader />
      <URLParams />
      <URLAuthorization />
      <URLHeaders />
      <URLBody />
    </Tabs>
  </div>
}

export {
  URLBuilder
}