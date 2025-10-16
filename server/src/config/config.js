const config = {
  mongoose: {
    url: process.env.DATABASE,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  CLERK: {
    PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLIENT_ID: process.env.CLERK_CLIENT_ID
  },
  MAX_WORKSPACES_OWNERSHIP_USER: 3,
  MAX_ALLOWED_USER_PER_WORKSPACE: 5
}

export default config;