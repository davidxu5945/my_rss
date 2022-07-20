const cheerio = require('cheerio');
const superagent = require('superagent');

const getOneData = async function(url) {
    return new Promise(resolve => {
        superagent.get(url).end((err, res) => {
            if (err) {
                return err
            }
            let $ = cheerio.load(res.text);
            let selectItem = $('#carousel-one .carousel-inner .item');
            let todayOne = selectItem[0];
            let todayOneData = {
                imgUrl: $(todayOne).find('.fp-one-imagen').attr('src'),
                type: $(todayOne).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ""),
                text: $(todayOne).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, ""),
            }
            resolve(todayOneData)
        })
    })
}
const getWeatherData = async function(url) {
    return new Promise(resolve => {
        superagent.get(url).end((err, res) => {
            if (err) {
                return err
            }
            let $ = cheerio.load(res.text);
            let arr = [];
            $('.table_day7').each((index, item) => {
                if (index < 3) {
                    arr.push({
                        "day": $(item).find('dd:nth-of-type(1)').text(),
                        "air": $(item).find('dd:nth-of-type(2) b').text(),
                        "icon": "http:" + $(item).find('dd:nth-of-type(3) img').attr("src"),
                        "weather": $(item).find('dd:nth-of-type(4)').text(),
                        "temp": $(item).find('dd:nth-of-type(5)').text().replace(/℃/g, "°"),
                    })
                }
            })
            resolve(arr)
        })
    })
}
const getDateIndex = () => Math.ceil((new Date().getTime() - 1658306861223) / (24 * 60 * 60 * 1000));
const getToday = () => new Date().getFullYear() + " / " + new Date().getMonth() + " / " + new Date().getDate();

module.exports = { getOneData, getWeatherData, getToday, getDateIndex }