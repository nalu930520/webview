import reqwest from 'reqwest'
import native from '@/utils/native'
import { apiURL } from './config'

const URL = apiURL
let token = ''
let language = ''
if (native) {
  token = `Bearer ${native.getToken()}`
  console.log('===================')
  console.log(token)
  language = native.getLanguage()
} else {
  token = 'Bearer j0qxVoVer2dqRNhzJTSz2Vtz24rRMh'
  language = 'en'
}
export default function request (req, outside) {
  const options = {
    headers: {
      'app-language': language,
      'Authorization': token
    },
    url: outside ? `${req.url}` : `${URL}/${req.url}`,
    method: req.method,
    contentType: 'application/json',
    crossOrigin: true,
    data: req.data
  }
  if (req.url === 'height_bet_participation' || req.url === 'user/invite_code') {
    options.processData = false
  }
  if (outside) {
    delete options.headers['app-language']
    delete options.headers['Authorization']
  }
  if (req.method === 'post' && req.url !== 'height_bet_participation' && req.url !== 'user/invite_code') {
    options.data = JSON.stringify(req.data)
  }
  return reqwest(options)
}
