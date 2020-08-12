const version = 'v1'
const api_prefix = `/api/${version}`

export default {
  headers: {
    authorization: localStorage.getItem('token'),
  },
  login: `${api_prefix}/admin/login`,
  user: `${api_prefix}/user`,
  upload: `${api_prefix}/upload`,
  word: `${api_prefix}/word`,
  uploadWordList: `${api_prefix}/word/file`,
  app: `${api_prefix}/app`,
  service: `${api_prefix}/service`,
  feedback: `${api_prefix}/service/feedback`,
  error: `${api_prefix}/information/error`,
}
