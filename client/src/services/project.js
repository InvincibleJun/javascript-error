import request from '../utils/request'

const api = {
  create: '/create',
  projects: '/get'
}

export const create = body => {
  return request(api.create, { method: 'POST', body })
}

export const projects = body => {
  return request(api.projects, { method: 'GET' })
}
