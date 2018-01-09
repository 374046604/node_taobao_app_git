const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

//路由跳转插件
const route = require('koa-route')
//获取post请求中间件
const bodyParser = require('koa-bodyparser')
 //添加一些方法什么的 好管理
var theData = {
    getQiangGou: function () {
        var endYear = new Date().getFullYear();
        var endMonth = new Date().getMonth();
        var endDay = new Date().getDate() + 1;
        var endTime = new Date(endYear, endMonth, endDay);
        setInterval(function () {
            var leftTime = endTime - (new Date().getTime());
            var leftHours = parseInt(Math.floor(leftTime / 1000 / 60 / 60 % 24));
            var leftMinutes = parseInt(Math.floor(leftTime / 1000 / 60 % 60));
            var leftSeconds = parseInt(Math.floor(leftTime / 1000 % 60));
            if (leftTime > 0) {
                if (leftHours < 10) {
                    leftHours = '0' + leftHours;
                }
                if (leftMinutes < 10) {
                    leftMinutes = '0' + leftMinutes;
                }
                if (leftSeconds < 10) {
                    leftSeconds = '0' + leftSeconds;
                }
                date1.innerHTML = leftHours;
                date2.innerHTML = leftMinutes;
                date3.innerHTML = leftSeconds;
            } else {
                return '';
            }
        }, 1000)
    }
}


app.use(route.get('/getData/qiangGouTime',(ctx)=>{
    var callBack = ctx.query.callback;
    console.log(callBack);
    var endData = "2019/01/01 00:00:00";
    ctx.response.type = 'text/javascript';
    ctx.response.body = callBack + '(' + JSON.stringify({
        "succeed": "1",
        "time": endData
    }) + ')'
}))
//首页的商品列表
app.use(route.get('/downloadApp', (ctx) => {
    ctx.body = '开始下载淘宝APP'
}))
app.use(route.get('/downloadApp', (ctx) => {
    ctx.body='开始下载淘宝APP'
}))

// //获取数据的请求全放这里
// let getData = new Router();
// getData.get('/', async(ctx) => {
//     return ;
// }).get('/qiangGouTime', async(ctx) => {
    
//     var callBack=ctx.request.query.callback;
//     var endData = "2019/01/01 00:00:00";
//     ctx.response.type = 'text/javascript';
//     ctx.response.body = callBack + '(' + JSON.stringify({
//         "succeed": "1",
//         "time": endData
//     }) + ')'
// });
// // 装载所有子路由
// let router = new Router()
// router.use('/getData', getData.routes(), getData.allowedMethods())



app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
});

