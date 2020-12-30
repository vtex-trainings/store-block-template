import { ClientsConfig, LRUCache, Service, ServiceContext } from '@vtex/api'

import { Clients } from './clients'

const TIMEOUT_MS = 5000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, {}>({
  clients,
  graphql: {
    resolvers: {
      Query: {},
    },
  },
})
