const version = 'v1'
const api_prefix = `/api/${version}`

export default {
  headers: {
    appname: 'namegenerator',
    packagename: 'com.greatpond.namegenerator',
    secret: '0Q3prsna4TLry26Zmu2bPnpl6hM2fw',
  },
  upload: `${api_prefix}/upload`,
  addWord: `${api_prefix}/word/add`,
}
