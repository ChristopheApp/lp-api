import axios from 'axios'
import { apiData } from '~/data'

const data = apiData;

const api = axios.create({
headers: {
    'Client-ID': data.client_id,
    // To use GetFollewedStreams, need OAuth token
    'Authorization' : data.authorization
}
})

export default api

export const getAppAcessToken = async () => {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: data.client_id,
        client_secret: data.client_secret
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))
    return response
}

export const getOAuthUserToken = async () => {
    const response = await axios.post('https://id.twitch.tv/oauth2/authorize', {
        client_id: data.client_id,
        redirect_uri: data.redirect_uri,
        response_type: data.response_type,
        scope: data.scope
    })
    .then(response => {response})
    .catch(err => console.error(err))
    return response
}
