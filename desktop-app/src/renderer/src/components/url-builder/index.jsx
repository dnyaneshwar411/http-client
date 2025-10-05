import { Tabs } from "../../ui/tabs"
import URLAuthorization from "./url-authorization"
import URLBody from "./url-body"
import URLBuilderHeader from "./url-builder-header"
import URLHeaders from "./url-headers"
import URLParams from "./url-params"

function URLBuilder() {
  return <div className="px-4 py-2">
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