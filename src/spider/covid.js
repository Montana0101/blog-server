import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'
// import './utils/print'
let url = 'https://www.worldometers.info/coronavirus/'
let titleName = ''
let spiderData = {}

class Spider {
  constructor() {
    this.getInitSpider()
  }

  async getHTMLInfo() {
    const result = await superagent.get(url)
    console.log('走开')
    return result.text
  }

  async getTargetEventJson(html) {
    const $ = cheerio.load(html, {
      ignoreWhitespace: true,
      xmlMode: true,
    })
    const professionInfos = []
    let list = $('.maincounter-number')

    list.map((index, element) => {
      const text = $(element).find('span')
      this.getIndexToTitle(index)
      professionInfos.push({
        [titleName]: text.text(),
      })
    })

    professionInfos.push({
      时间: this.getNowFormatDate(),
    })
    // console.log('professionInfos', professionInfos)
    let fileName = path.resolve(__dirname, '../json/covid.json')
    fs.writeFileSync(fileName, JSON.stringify(professionInfos))
    return professionInfos
  }

  getNowFormatDate() {
    var date = new Date()
    var seperator1 = '-'

    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var strDate = date.getDate()

    if (month >= 1 && month <= 9) {
      month = parseInt('0' + month)
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = parseInt('0' + strDate)
    }
    var currentdate =
      year +
      seperator1 +
      month +
      seperator1 +
      strDate +
      '  ' +
      hour +
      ':' +
      minutes +
      ':' +
      seconds

    return currentdate
  }

  // 根据Index返回标题
  getIndexToTitle(index) {
    switch (index) {
      case 0:
        return (titleName = '染疫')
      case 1:
        return (titleName = '死亡')
      case 2:
        return (titleName = '治愈')
    }
  }

  generateJSON(dataJSON) {
    let fileName = path.resolve(__dirname, '../data/covid.json')
    let pastData = []
    let currentData = {
      data: dataJSON,
      createTime: this.getNowFormatDate(),
    }
    if (fs.existsSync(fileName)) {
      pastData = [...JSON.parse(fs.readFileSync(fileName, 'utf-8'))]
      pastData.push(currentData)
    }
    // fs.writeFileSync(fileName, JSON.stringify(pastData))
  }

  async getInitSpider() {
    const html = await this.getHTMLInfo()
    const dataJSON = await this.getTargetEventJson(html)
    this.generateJSON(dataJSON)
  }
}
// new Spider()
// setInterval(() => {
//   new Spider()
// }, 30000)

module.exports = Spider
