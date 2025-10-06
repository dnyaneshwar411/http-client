import { defaultHeaders } from "../../config/url-container";

export const initialState = {
  method: {
    /**
     *  GET, POST, PUT, PATCH,
     *  DELETE, HEAD, OPTIONS.
     */
    value: "GET",
    error: {
      hasError: false,
      message: "",
    }
  },

  url: {
    value: "",
    error: {
      hasError: false,
      message: ""
    }
  },

  params: {
    /**
     * { 
     *    id:1, 
     *    selected: Boolean,
     *    name: String,
     *    value: String
     * }
     */
    values: [],

    error: {
      hasError: false,
      message: ""
    }
  },


  authorization: {
    // noauth, basic, bearer
    selected: "bearer",

    /**
      * depending on the authorization type the object payload will be different
      * [Authorization Type]: {
      *    error: {
      *       hasError: Boolean,
      *       message: String
      *   },
      *   value: {
      *       data: AuthorizationTypePayload
      *   }
      * }
      */
    "bearer": {
      value: "",
      error: {
        hasError: false,
        message: ""
      }
    },

    basic: {
      value: {
        username: "",
        password: ""
      },
      error: {
        hasError: false,
        message: ""
      }
    }
  },


  headers: {
    /**
     * following is shape of every item in the header
     * {
     *    id: Number
     *    selected: Boolean
     *    mandatory: Boolean
     *    name: String
     *    value: String
     * }
     */
    values: defaultHeaders,

    errors: {
      hasError: false,
      message: ""
    }
  },

  // none, form-data, urlencoded, raw
  body: {
    selected: "none",

    /**
     * depending on the body type the object payload will be different
     * [Body Type]: {
     *    error: {
     *       hasError: Boolean,
     *       message: String
     *   },
     *   value: {
     *       data: BodyTypePayload
     *   }
     * }
     */
    values: {
      error: {
        hasError: false,
        message: ""
      },
      payload: {}
    },

    formData: {
      /**
       * following is the shape of the item in the Form Data
       * {
       *    id: Number,
       *    selected: Boolean,
       *    type: enum: ["file", "text"],
       *    nane: String,
       *    value: String,
       *    file: Object
       * }
       */
      values: [],

      error: {
        hasError: false,
        message: ""
      }
    },


    json: {
      /**
       * values field is of type object
       * {
       *    [String]: String
       * }
       */
      values: "",

      error: {
        hasError: false,
        message: ""
      }
    }
  }
}