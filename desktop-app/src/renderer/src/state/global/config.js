export const initialState = {
  ui: {
    state: "building", // building, workspacesF, collectionF
  },

  user: {
    // loading, logged-in, logged-out, verify-otp, error, session-created
    status: "loading"
  },


  sidebar: {
    // collapsed, opened
    state: "collapsed",

    // collection, environment, snippet
    selected: "collection",

    snippet: {
      selected: "curl"
    }
  },


  environment: {

    // to manage multiple environments
    // compulsory folder global
    envs: [
      {
        id: 1,
        name: "Global",
        error: {
          hasError: false,
          message: ""
        },
        mandatory: true,
        values: [],
        /**
         * {
         *    id: Number,
         *    name: String,
         *    value: String | Boolean | Number
         * }
         */
      }
    ],
    error: {
      hasError: false,
      message: ""
    }
  },


  workspaces: [],

  // selected requests.
  requests: {
    current: undefined,
    selected: []
  }
}