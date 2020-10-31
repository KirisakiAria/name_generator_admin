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
  uploadWordList: `${prefix}/word/upload`,
  couples: `${prefix}/word/couples`,
  addToWordList: `${prefix}/word/couples/addToWordList`,
  uploadCouplesList: `${prefix}/word/couples/upload`,
  deleteCouples: `${prefix}/word/couples/delete`,
  toggleshowable: `${prefix}/word/couples/toggleshowable`,
  wordOutput: `${prefix}/word/output`,
  couplesOutput: `${prefix}/word/couples/output`,
  app: `${prefix}/app`,
  service: `${prefix}/service`,
  feedback: `${prefix}/service/feedback`,
  error: `${prefix}/information/error`,
  classify: `${prefix}/dictionary/classify`,
  inspiration: `${prefix}/inspiration`,
  deleteInspiration: `${prefix}/inspiration/delete`,
  notification: `${prefix}/notification`,
  deleteNotification: `${prefix}/notification/delete`,
}
