


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

// 写入目录
const mkdirsSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
    return false
}

function getSuffix(fileName) {
    return fileName.split('.').pop()
}

// 重命名
function Rename(fileName) {
    return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}
// 删除文件
function removeTemImage(path) {
    fs.unlink(path, (err) => {
        if (err) {
            throw err
        }
    })
}

// 上传到本地服务器
function uploadFile(ctx, options) {
    const busboy = new Busboy({ headers: ctx.req.headers })
    //目录路径
    const filePath = options.path;
    //创建目录
    const confirm = mkdirsSync(filePath)
    if (!confirm) {
        return
    }
    console.log('start uploading...')
    return new Promise((resolve, reject) => {
        console.log(filePath);
        console.log(filePath);
        console.log(filePath);
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log(`File [${fieldname}]: filename: ${filename}`)
            // 文件保存到特定路径
            file.pipe(fs.createWriteStream(filePath))
            // 开始解析文件流
            file.on('data', function (data) {
                console.log(`文件文件` + data)
            })
            // 解析文件结束
            file.on('end', function () {
                file.pipe(fstream); 
                resolve({'succeed':'1'})
            })
        })

        // 监听请求中的字段
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
            console.log(`可以获取文件的一些信息`);
        })

        // 监听结束事件
        busboy.on('finish', function () {
            console.log('解析完成');
            ctx.res.writeHead(303, { Connection: 'close', Location: '/' })
        })
        ctx.req.pipe(busboy)
    })
}



app.use(route.post('/up', async function (ctx, next) {

    //本地服务器路径
    const serverPath = path.join(__dirname, './uploads/')
    // 获取上存图片
    const result = await uploadFile(ctx, {
        path: serverPath
    })
    //返回成功状态什么的
    console.log(result);
    //删除原来的缓存图片
    //removeTemImage(imgPath)
    ctx.body ='222222222222222';
}));

app.listen(3000);

console.log('listening on port 3000');



