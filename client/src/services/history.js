import request from '../utils/request';

const api = {
    get: '/error/search'
}

export const get = query => {
    return request(api.get, {method: 'GET', query})
}
