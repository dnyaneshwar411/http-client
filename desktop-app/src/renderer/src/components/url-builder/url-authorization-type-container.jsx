import { Input } from "../../ui/input";
import { useState } from "react";
import { Eye, EyeClosed, TriangleAlert } from "lucide-react";
import { useRequestContext } from "../../state/request/RequestProvider";
import { authorizationUpdate } from "../../state/request/reducer";

export default function URLAuthorizationTypeContainer() {
  return <div className="pl-4 grow">
    <AuthorizationNoAuth />
    <AuthorizationBasicAuth />
    <AuthorizationBearerToken />
  </div>
}

function AuthorizationNoAuth() {
  const {
    state: {
      authorization: { selected }
    }
  } = useRequestContext();
  if (selected !== "noauth") return <></>
  return <div className="bg-r ed-200 h-full flex items-center justify-center grow">
    <div className="text-center">
      <TriangleAlert className="bg-[#FFFFFF1A] w-[48px] h-[48px] mb-4 block mx-auto p-2 rounded-[6px]" />
      <h4 className="font-bold text-[24px]">No Auth</h4>
      <p className="leading-tight text-[14px]">This request does not require authorization!</p>
    </div>
  </div>
}

function AuthorizationBasicAuth() {
  const {
    state: {
      authorization: {
        basic: { value, ...basic },
        ...authorization
      }
    },
    dispatch
  } = useRequestContext();
  if (authorization.selected !== "basic") return <></>
  return <div>
    <label className="mb-4 flex items-center">
      <div className="w-xs">User Name</div>
      <Input
        placeholder="User Name"
        className="max-w-sm"
        value={value.username}
        onChange={e => dispatch(authorizationUpdate({
          ...authorization,
          basic: {
            ...basic,
            value: {
              ...value,
              username: e.target.value
            }
          }
        }))}
      />
    </label>
    <label className="flex items-center">
      <div className="w-xs">Password</div>
      <Input
        placeholder="Password"
        className="max-w-sm"
        value={value.password}
        onChange={e => dispatch(authorizationUpdate({
          ...authorization,
          basic: {
            ...basic,
            value: {
              ...value,
              password: e.target.value
            }
          }
        }))}
      />
    </label>
  </div>
}

function AuthorizationBearerToken() {
  const {
    state: {
      authorization: {
        bearer,
        ...authorization
      }
    },
    dispatch
  } = useRequestContext();
  const [show, setShow] = useState(false);
  if (authorization.selected !== "bearer") return <></>
  return <div className="flex items-center">
    <p className="min-w-[200px]">Token</p>
    <div className="relative">
      <Input
        placeholder="Bearer"
        className="!w-xs"
        type={show ? "text" : "password"}
        value={bearer.value}
        onChange={e => dispatch(authorizationUpdate({
          ...authorization,
          bearer: {
            ...bearer,
            value: e.target.value
          },
        }))}
      />
      {show
        ? <Eye
          className="w-[16px] h-[16px] absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
          onClick={() => setShow(false)}
        />
        : <EyeClosed
          className="w-[16px] h-[16px] absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
          onClick={() => setShow(true)}
        />}
    </div>
  </div>
}