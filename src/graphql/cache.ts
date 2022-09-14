import { InMemoryCache } from '@apollo/client';
import { theme } from './reactivities/ThemeVariable';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        theme: {
          read() {
            return theme();
          }
        },
      }
    }
  }
})

export default cache