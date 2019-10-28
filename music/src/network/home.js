import request from './request'

//请求接口无需传参
//热门歌单
export function getRecommendSongs(limit){
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getCatlist(){
  return request({
    url: '/playlist/catlist'
  })
}
