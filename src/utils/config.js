const env = process.env.NODE_ENV
console.log(env)
module.exports = {
  apiURL: env === 'production' || env === 'preProduction' ? 'https://api.mobimecdn.com' : 'https://staging-wallet-api.mobiapp.cn',
  registerURL: env === 'production' || env === 'preProduction' ? 'https://web.mobi.me/register' : 'https://staging-web.mobiapp.cn/register'
}
