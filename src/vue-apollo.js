import Vue from 'vue'
import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo'
import AppSyncConfig from '@/../.config'

Vue.use(VueApollo)

const config = {
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authType,
    apiKey: AppSyncConfig.apiKey,
  }
}
const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
}

const client = new AWSAppSyncClient(config, options)

export default new VueApollo({
  defaultClient: client
})


// Manually call this when user log in
// export async function onLogin (apolloClient, token) {
//   localStorage.setItem(AUTH_TOKEN, token)
//   if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
//   try {
//     await apolloClient.resetStore()
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.log('%cError on cache reset (login)', 'color: orange;', e.message)
//   }
// }
//
// // Manually call this when user log out
// export async function onLogout (apolloClient) {
//   localStorage.removeItem(AUTH_TOKEN)
//   if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
//   try {
//     await apolloClient.resetStore()
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
//   }
// }
