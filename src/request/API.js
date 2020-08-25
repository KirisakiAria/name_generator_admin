const version = 'v1'
const prefix = `/api/${version}`

export default {
  headers: {
    authorization: localStorage.getItem('token'),
  },
  login: `${prefix}/admin/login`,
  user: `${prefix}/user`,
  upload: `${prefix}/upload`,
  word: `${prefix}/word`,
  deleteWord: `${prefix}/word/delete`,
  uploadWordList: `${prefix}/word/file`,
  couples: `${prefix}/word/couples`,
  deleteCouples: `${prefix}/word/couples/delete`,
  toggleshowable: `${prefix}/word/couples/toggleshowable`,
  output: `${prefix}/word/output`,
  app: `${prefix}/app`,
  service: `${prefix}/service`,
  feedback: `${prefix}/service/feedback`,
  error: `${prefix}/information/error`,
  classify: `${prefix}/dictionary/classify`,
}
