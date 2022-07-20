// 配置信息
module.exports = {
    fromDisplayText: '阿西', // 收件箱展示的来件人名字
    fromDisplaySubText: '每日图片', // 收件箱展示的次级标题
    user: process.env.sender || '', // 发送者邮箱
    pass: process.env.sender_pass || '', // 发送者邮箱MTP协议密码
    to: process.env.receiver || '', // 发送到谁，填邮箱
    startDay: '2015-09-29', // 在一起的日期
}