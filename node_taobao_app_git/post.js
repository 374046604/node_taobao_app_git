const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
//获取post请求中间件
const bodyParser = require('koa-bodyparser')

//使用中间件
app.use(bodyParser())

app.use(async (ctx) => {
    //获取请求路径
    let url = ctx.url;
    //请求对象
    var req = ctx.request;
    //下面2方法获取参数
    //1异步处理获取的参数
    // var postData = await parsePostData(ctx);
    // ctx.body=postData;
    //2使用中间件
    let postData = ctx.request.body
    ctx.body = postData;

})

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
});

// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end", function () {
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}