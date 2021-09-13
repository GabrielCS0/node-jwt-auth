declare namespace NodeJS { // eslint-disable-line no-unused-vars
  export interface ProcessEnv {
    NODE_ENV?: string
    MONGO_USER?: string
    MONGO_PASS?: string
    MONGO_DB?: string
    JWT_SECRET?: string
  }
}
