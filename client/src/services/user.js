import request from '../utils/request'

const api = {
  search: '/user/search'
}

export const search = query => {
  return request(api.search, { method: 'GET', query })
}
