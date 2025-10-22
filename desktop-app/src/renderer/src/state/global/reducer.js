export function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER_SESSION_STATUS":
      return {
        ...state,
        user: {
          status: action.payload
        }
      }

    case "LOGIN_USER_SESSION":
      return {
        ...state,
        user: {
          status: "session-created",
          data: action.payload
        }
      }

    case "USER_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        }
      }

    case "USER_LOGOUT":
      return {
        ...state,
        user: {
          status: "logged-out"
        }
      }

    case "UPDATE_SIDEBAR_SELECTED_ITEM":
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selected: action.payload,
          state: state.sidebar.state === "collapsed" ||
            state.sidebar.selected !== action.payload
            ? "opened"
            : "collapsed"
        }
      }
    case "UPDATE_CODE_SNIPPET_OPTION":
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          snippet: {
            ...state.sidebar.snippet,
            selected: action.payload,
          }
        }
      }
    case "ADD_ENVIRONMENT":
      return {
        ...state,
        environment: {
          ...state.environment,
          envs: [
            ...state.environment.envs,
            {
              id: state.environment.envs.length + 1,
              name: `ENV ${state.environment.envs.length + 1}`,
              error: {
                hasError: false,
                message: ""
              },
              mandatory: false,
              values: []
            }
          ]
        }
      }
    case "UPDATE_ENVIRONMENT": {
      return {
        ...state,
        environment: {
          ...state.environment,
          envs: state
            .environment
            .envs
            .map(env => env.id === action.payload.id
              ? {
                ...env,
                ...action.payload
              }
              : env
            )
        }
      }
    }
    case "DELETE_ENVIRONMENT":
      const env = state.environment.envs.find(item => item.id === action.payload)
      if (env?.mandatory) return state
      return {
        ...state,
        environment: {
          ...state.environment,
          envs: state
            .environment
            .envs
            .filter(env => env.id !== action.payload)
        }
      }
    case "ADD_ENVIRONMENT_VARIABLE":
      return {
        ...state,
        environment: {
          ...state.environment,
          envs: state.environment.envs.map(env => env.id === action.payload
            ? {
              ...env,
              values: [
                ...env.values,
                {
                  id: env.values.length + 1,
                  name: "",
                  value: ""
                }
              ]
            }
            : env
          )
        }
      }
    case "DELETE_ENVIRONMENT_VARIABLE":
      return {
        ...state,
        environment: {
          ...state.environment,
          envs: state.environment.envs.map(env => env.id === action.payload.envId
            ? {
              ...env,
              values: env.values.filter(variable => variable.id !== action.payload.varId)
            }
            : env
          )
        }
      }
    case "UPDATE_ENVIRONMENT_VARIABLE":
      return {
        ...state,
        environment: {
          ...state.environment,
          envs: state
            .environment
            .envs
            .map(env => env.id === action.payload.envId
              ? {
                ...env,
                values: env
                  .values
                  .map(variable => variable.id === action.payload.variable.id
                    ? {
                      ...variable,
                      ...action.payload.variable
                    }
                    : variable
                  )
              }
              : env
            )
        }
      }

    case "WORKSPACE_FETCHED":
      return {
        ...state,
        workspaces: action
          .payload
          .map((workspace, idx) => idx === 0
            ? ({ ...workspace, selected: true })
            : ({ ...workspace, selected: false })),
        ui: {
          state: "workspacesF"
        }
      }

    case "WORKSPACE_SELECTION":
      return {
        ...state,
        workspaces: state
          .workspaces
          .map((workspace) => workspace._id === action.payload
            ? ({ ...workspace, selected: true })
            : ({ ...workspace, selected: false })),
        ui: {
          state: "workspacesF"
        }
      }

    default:
      return state;
  }
}

export function updateUserSessionStatus(payload) {
  return {
    type: "UPDATE_USER_SESSION_STATUS",
    payload
  }
}

export function loginUserSession(payload) {
  return {
    type: "LOGIN_USER_SESSION",
    payload
  }
}

export function userUpdate(payload) {
  return {
    type: "USER_UPDATE",
    payload
  }
}

export function userLogout() {
  return {
    type: "USER_LOGOUT"
  }
}

export function updateSidebarSelectedItem(payload) {
  return {
    type: "UPDATE_SIDEBAR_SELECTED_ITEM",
    payload
  }
}

export function updateCodeSnippetOption(payload) {
  return {
    type: "UPDATE_CODE_SNIPPET_OPTION",
    payload
  }
}

export function addEnvironment(payload) {
  return {
    type: "ADD_ENVIRONMENT",
    payload
  }
}

export function updateEnvironment(payload) {
  return {
    type: "UPDATE_ENVIRONMENT",
    payload
  }
}

export function deleteEnvironment(payload) {
  return {
    type: "DELETE_ENVIRONMENT",
    payload
  }
}

export function addEnvironmentVariable(payload) {
  return {
    type: "ADD_ENVIRONMENT_VARIABLE",
    payload
  }
}

export function deleteEnvironmentVariable(payload) {
  return {
    type: "DELETE_ENVIRONMENT_VARIABLE",
    payload
  }
}

export function updateEnvironmentVariable(payload) {
  return {
    type: "UPDATE_ENVIRONMENT_VARIABLE",
    payload
  }
}

export function workspacesFetched(payload) {
  return {
    type: "WORKSPACE_FETCHED",
    payload
  }
}

export function workspaceSelection(payload) {
  return {
    type: "WORKSPACE_SELECTION",
    payload
  }
}