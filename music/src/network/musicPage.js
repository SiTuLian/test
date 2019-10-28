import request from './request'

export function getPlaylistDetail(id){
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getMusicUrl(id){
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

export function getMusicLyc(id){
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

