const version = 'v1'
const api_prefix = `/api/${version}`

export default {
  login: `${api_prefix}/admin/login`,
  user: `${api_prefix}/user`,
  upload: `${api_prefix}/upload`,
  word: `${api_prefix}/word`,
  uploadWordList: `${api_prefix}/word/file`,
  app: `${api_prefix}/app`,
}
