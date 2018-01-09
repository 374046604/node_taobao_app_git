


const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
//跨域
const Busboy = require('busboy')
const cors = require('koa2-cors');
// const qiniu = require('qiniu')
// const qiniuConfig = require('./qiniuconfig')



const app = new Koa();

app.use(serve(__dirname + '/public/'));



// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        //这里配置发送请求的 域名 端口 就能跨域了
        return 'http://127.0.0.1';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(async (ctx) => {
    if (ctx.url === '/up' && ctx.method === 'POST') {
        // 上传文件请求处理
        let result = { success: false }
        let serverFilePath = path.join(__dirname, 'uploads')

        // 上传文件事件
        result = await uploadFile(ctx, {
            path: serverFilePath
        })

        ctx.body = result
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
})

function uploadFile(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({ headers: req.headers })

    // 获取类型
    let filePath = options.path;
    //创建目录 返回状态
    let mkdirResult = mkdirsSync(filePath);

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = {
            success: false,
            formData: {},
        }

        // 解析请求文件事件
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(_uploadFilePath)
            console.log(saveTo);
            console.log(saveTo);
            console.log(saveTo);
            console.log(saveTo);
            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))

            // 文件写入事件结束
            file.on('end', function () {
                result.success = true
                result.message = '文件上传成功'

                console.log('文件上传成功！')
                resolve(result)
            })
        })

        // 解析表单中其他字段信息
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });

        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上结束')
            resolve(result)
        })

        // 解析错误事件
        busboy.on('error', function (err) {
            console.log('文件上出错')
            reject(result)
        })

        req.pipe(busboy)
    })

}
//创建目录
function mkdirsSync(dirname) {
    //判断路径是否存在
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}
//文件后缀名
function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}


app.listen(3000);

console.log('listening on port 3000');



