const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
app.use(async (ctx)=>{
    //获取请求路径
    let url=ctx.url;
    console.log(url);
    //请求对象
    var req=ctx.request;
    //请求参数
    console.log(req.query);
    //参数字符串
    console.log(req.querystring);
})

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
});

