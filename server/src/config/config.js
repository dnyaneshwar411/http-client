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
  }
}

export default config;