const sendMail = require("./sendEmail")
const { to, user, pass } = require('./config');
const { getOneData, getImageData, getWeatherData, getToday, getDateIndex } = require('./oneImg');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

if (to !== '' && user !== '' && pass !== '') {

    const oneUrl = "http://wufazhuce.com";
    const weatherUrl = "http://www.tianqi.com/beijing/7/";
    const oneDataPromise = getOneData(oneUrl);
    const weatherDataPromise = getWeatherData(weatherUrl);
    const dateIndex = getDateIndex();
    const today = getToday();
    const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'view/index.ejs'), 'utf8'));
    Promise.all([oneDataPromise, weatherDataPromise]).then(function(data) {
        getImageData(data[0].imgUrl).then(function(imgData) {
            // console.log(data)
            data[0].imgData = imgData;
            let ejsModelObject = {
                oneData: data[0],
                weatherData: data[1],
                dateIndex: dateIndex,
                today: today,
            };
            const html = template(ejsModelObject);
            let mailOptions = {
                from: '"每日预报"',
                to: to,
                subject: '每日预报' + dateIndex, // Subject line
                html: html
            };
            console.log(html);
            console.log(data[0].imgUrl);
            console.log(imgData.substring(0, 100));
            sendMail(mailOptions, function(err, info) {
                if (err) {
                    console.log("err", err)
                }
                console.log(info);
            });
        });
    });
} else {
    console.warn("config is empty");
}