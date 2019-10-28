import axios from 'axios'

const resquest = function(config){
  const instance = axios.create({
    // baseURL: '/api/',
    baseURL: 'http://www.arthurdon.top:3000/',
    timeout: 10000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}

export default resquest;