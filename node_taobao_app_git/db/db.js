// 引入模块
var mongoose = require('mongoose');
var url= require('./url').url;

// 连接数据库
var db = mongoose.createConnection(url);
// 设置数据模型 第二个参数书集合名称
var monSchema = new mongoose.Schema({
    name: { type: String, default: "username" },
    age: { type: Number },
    sex: { type: String }
}, {
        //{versionKey: false}是干嘛用？如果不加这个设置，我们通过mongoose第一次创建某个集合时，
        //它会给这个集合设定一个versionKey属性值，这个属性值包含这个文档的内部版本，数据库中显示为_v，如图：
        versionKey: false,
        //定死集合 不会自己家s
        collection: 'student'
    });
// 数据模型实例  用的是student 集合
var monModel = db.model('student', monSchema);

//增加 dbAdd({ name: "姓名222222222", age: 23, sex: '男' })
exports.dbAdd = function (content) {
    // 实例化对象并插入数据
    var monInsert = new monModel(content);
    monInsert.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('成功插入数据');
            db.close();
        }
    });
}
//删除 dbDelete({name: "333"});
exports.dbDelete=function (del) {
    monModel.remove(del, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("删除成功");
        }
        db.close();
    });
}


//修改 dbUpdata({'name':111},{'name':2222},true)
exports.dbUpdata=function(oldValue,newVlaue,more) {
    var option;
    if (more) {
        option = { 'multi': true }
    } else {
        option = { 'multi': false }
    }

    //第三个参数是 配置项 {'multi':true} 多条更新
    monModel.update(oldValue, newVlaue, option, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("更新成功");
            db.close();
        }
    });
}

//查询 dbFind({name: "111"})
exports.dbFind = function (content) {
    //返回这3个键的值 其他不显示 field 不加直接显示
    //var field = ['name', 'age', 'sex'];
    monModel.find(content, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        db.close();
    });
}





