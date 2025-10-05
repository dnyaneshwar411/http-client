export function reducer(state, action) {
  switch (action.type) {

    // Related to Method
    case "CHANGE_METHOD":
      return {
        ...state,
        method: action.payload
      };

    case "CHANGE_URL":
      const absolute = action.payload.value.split("?")[0]
      return {
        ...state,
        url: {
          value: absolute,
          error: action.payload.error
        }
      }

    case "PARAMS_SELECT": {
      return {
        ...state,
        params: {
          ...state.params,
          values: state.params.values.map(param => action.payload.includes(param.id)
            ? ({
              ...param,
              selected: true
            })
            : param
          )
        }
      }
    }

    case "PARAMS_UNSELECT": {
      return {
        ...state,
        params: {
          ...state.params,
          values: state.params.values.map(param => action.payload.includes(param.id)
            ? ({
              ...param,
              selected: false
            })
            : param
          )
        }
      }
    }

    case "PARAMS_ADD": {
      const lastItem = state.params.values.at(state.params.values.length - 1)
      return {
        ...state,
        params: {
          ...state.params,
          values: lastItem && !Boolean(lastItem.name) && !Boolean(lastItem.value)
            ? state.params.values
            : [
              ...state.params.values,
              {
                id: state.params.values.length + 1,
                selected: true,
                name: "",
                value: ""
              }
            ]
        }
      }
    }

    case "PARAMS_REMOVE": {
      return {
        ...state,
        params: {
          ...state.params,
          values: state.params.values
            .filter(param => param.id !== action.payload)
            .map((item, index) => ({
              ...item,
              id: index + 1
            }))
        }
      }
    }

    case "PARAMS_UPDATE": {
      return {
        ...state,
        params: {
          ...state.params,
          values: state.params.values
            .map((param) => param.id === action.payload.id
              ? action.payload
              : param
            )
        }
      }
    }


    case "AUTHORIZATION_UPDATE": {
      return {
        ...state,
        authorization: {
          ...state.authorization,
          ...action.payload,
        }
      }
    }


    case "HEADERS_SELECT": {
      return {
        ...state,
        headers: {
          ...state.headers,
          values: state.headers.values.map(header => action.payload.includes(header.id)
            ? ({
              ...header,
              selected: true
            })
            : header
          )
        }
      }
    }

    case "HEADERS_UNSELECT": {
      return {
        ...state,
        headers: {
          ...state.headers,
          values: state.headers.values.map(header =>
            action.payload.includes(header.id) && !header.mandatory
              ? ({
                ...header,
                selected: false
              })
              : header
          )
        }
      }
    }

    case "HEADERS_ADD": {
      const lastItem = state.headers.values.at(state.headers.values.length - 1)
      return {
        ...state,
        headers: {
          ...state.headers,
          values: lastItem && !Boolean(lastItem.name) && !Boolean(lastItem.value)
            ? state.headers.values
            : [
              ...state.headers.values,
              {
                id: state.headers.values.length + 1,
                selected: true,
                name: "",
                value: "",
                includeInSnippet: true
              }
            ]
        }
      }
    }

    case "HEADERS_REMOVE": {
      return {
        ...state,
        headers: {
          ...state.headers,
          values: state.headers.values
            .filter(header => header.id !== action.payload)
            .map((item, index) => ({
              ...item,
              id: index + 1
            }))
        }
      }
    }

    case "HEADERS_UPDATE": {
      return {
        ...state,
        headers: {
          ...state.headers,
          values: state.headers.values
            .map((header) => header.id === action.payload.id
              ? action.payload
              : header
            )
        }
      }
    }

    case "BODY_UPDATE": {
      return {
        ...state,
        body: {
          ...state.body,
          ...action.payload,
        }
      }
    }

    case "BODY_FORM_DATA_SELECT": {
      return {
        ...state,
        body: {
          ...state.body,
          formData: {
            ...state.body.formData,
            values: state.body.formData.values.map(item =>
              action.payload.includes(item.id)
                ? { ...item, selected: true }
                : item
            )
          }
        }
      }
    }

    case "BODY_FORM_DATA_UNSELECT": {
      return {
        ...state,
        body: {
          ...state.body,
          formData: {
            ...state.body.formData,
            values: state.body.formData.values.map(item =>
              action.payload.includes(item.id)
                ? { ...item, selected: false }
                : item
            )
          }
        }
      }
    }

    case "BODY_FORM_DATA_ADD": {
      const lastItem = state.body.formData.values.at(state.body.formData.values.length - 1)
      return {
        ...state,
        body: {
          ...state.body,
          formData: {
            ...state.body.formData,
            values: lastItem && !Boolean(lastItem.name) && !Boolean(lastItem.value)
              ? state.body.formData.values
              : [
                ...state.body.formData.values,
                {
                  id: state.body.formData.values.length + 1,
                  selected: true,
                  type: "text",
                  name: "",
                  value: "",
                  file: {}
                }
              ]
          }
        }
      }
    }

    case "BODY_FORM_DATA_REMOVE": {
      return {
        ...state,
        body: {
          ...state.body,
          formData: {
            ...state.body.formData,
            values: state.body.formData.values
              .filter(item => item.id !== action.payload)
              .map((item, index) => ({
                ...item,
                id: index + 1
              }))
          }
        }
      }
    }

    case "BODY_FORM_DATA_UPDATE": {
      return {
        ...state,
        body: {
          ...state.body,
          formData: {
            ...state.body.formData,
            values: state.body.formData.values.map(item =>
              item.id === action.payload.id
                ? { ...item, ...action.payload }
                : item
            )
          }
        }
      }
    }

    case "BODY_JSON_UPDATE": {
      return {
        ...state,
        body: {
          ...state.body,
          json: {
            ...state.body.json,
            values: action.payload
          }
        }
      }
    }

    default:
      return state;
  }
}

export function changeMethod(payload) {
  return {
    type: "CHANGE_METHOD",
    payload
  }
}

export function changeURL(payload) {
  return {
    type: "CHANGE_URL",
    payload
  }
}

export function paramsSelect(payload) {
  return {
    type: "PARAMS_SELECT",
    payload
  }
}

export function paramsUnselect(payload) {
  return {
    type: "PARAMS_UNSELECT",
    payload
  }
}

export function paramsAdd() {
  return {
    type: "PARAMS_ADD"
  }
}

export function paramsUpdate(payload) {
  return {
    type: "PARAMS_UPDATE",
    payload
  }
}

export function paramsRemove(payload) {
  return {
    type: "PARAMS_REMOVE",
    payload
  }
}

export function authorizationUpdate(payload) {
  return {
    type: "AUTHORIZATION_UPDATE",
    payload
  }
}

export function headersSelect(payload) {
  return {
    type: "HEADERS_SELECT",
    payload
  }
}

export function headersUnselect(payload) {
  return {
    type: "HEADERS_UNSELECT",
    payload
  }
}

export function headersAdd() {
  return {
    type: "HEADERS_ADD"
  }
}

export function headersUpdate(payload) {
  return {
    type: "HEADERS_UPDATE",
    payload
  }
}

export function headersRemove(payload) {
  return {
    type: "HEADERS_REMOVE",
    payload
  }
}

export function bodyUpdate(payload) {
  return {
    type: "BODY_UPDATE",
    payload
  }
}

export function bodyFormDataSelect(payload) {
  return {
    type: "BODY_FORM_DATA_SELECT",
    payload
  }
}

export function bodyFormDataUnselect(payload) {
  return {
    type: "BODY_FORM_DATA_UNSELECT",
    payload
  }
}

export function bodyFormDataAdd() {
  return {
    type: "BODY_FORM_DATA_ADD"
  }
}

export function bodyFormDataUpdate(payload) {
  return {
    type: "BODY_FORM_DATA_UPDATE",
    payload
  }
}

export function bodyFormDataRemove(payload) {
  return {
    type: "BODY_FORM_DATA_REMOVE",
    payload
  }
}

export function bodyJSONUpdate(payload) {
  return {
    type: "BODY_JSON_UPDATE",
    payload
  }
}