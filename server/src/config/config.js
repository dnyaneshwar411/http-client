const config = {
  mongoose: {
    url: process.env.DATABASE,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
}

export default config;