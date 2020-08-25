const version = 'v1'
const prefix = `/api/${version}`

export default {
  headers: {
    authorization: localStorage.getItem('token'),
  },
  system: `${prefix}/system`,
  login: `${prefix}/admin/login`,
  user: `${prefix}/user`,
  upload: `${prefix}/upload`,
  word: `${prefix}/word`,
  deleteWord: `${prefix}/word/delete`,
  uploadWordList: `${prefix}/word/file`,
  couples: `${prefix}/word/couples`,
  deleteCouples: `${prefix}/word/couples/delete`,
  toggleshowable: `${prefix}/word/couples/toggleshowable`,
  wordOutput: `${prefix}/word/output`,
  couplesOutput: `${prefix}/word/couples/output`,
  app: `${prefix}/app`,
  service: `${prefix}/service`,
  feedback: `${prefix}/service/feedback`,
  error: `${prefix}/information/error`,
  classify: `${prefix}/dictionary/classify`,
}
