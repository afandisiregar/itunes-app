import Client from './clients/AxiosClient'
const resource = '/search'

export default {
    get(payload) {
        return new Promise((resolve,reject) => {
            Client.get(`${resource}?${payload}`).then(response => {resolve(response.data)})
            .catch(error => {reject(error)})
        })
    },
}