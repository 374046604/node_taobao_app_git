const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
//定义路径  引入模板
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(async(ctx) => {
    let title = {'name':'11111111111','age':'222222222222'}
    await ctx.render('index', {
        title,
    })
})

app.listen(3000)
