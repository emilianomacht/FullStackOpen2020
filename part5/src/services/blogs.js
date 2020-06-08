import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newPost => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.post(baseUrl, newPost, config)
  return resp
}

const update = async updatedPost => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.put(`${baseUrl}/${updatedPost.id}`, updatedPost, config)
  return resp
}

export default { getAll, setToken, create, update }