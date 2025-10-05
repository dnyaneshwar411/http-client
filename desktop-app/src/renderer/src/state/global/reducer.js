export function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_SIDEBAR_SELECTED_ITEM":
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selected: action.payload
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

    default:
      return state;
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