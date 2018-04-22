import request from '../utils/request';

const api = {
    create: '/project/create',
    projects: '/project/get'
}

export const create = body => {
    return request(api.create, {method: 'POST', body})
}

export const projects = body => {
    return request(api.projects, {method: 'GET'})
}