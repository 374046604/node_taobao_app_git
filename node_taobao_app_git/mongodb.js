var db= require('./db/db')
db.dbAdd({'name':'1231312131','age':'123232323'})
db.dbDelete({'sex':'男'})
db.dbUpdata({ 'name': '222222222' }, { 'name': '0000000000000000'},true)
db.dbFind({ 'name': '0000000000000000' });





// // 引入模块
// var mongoose = require('mongoose');
// // 连接数据库
// var db = mongoose.createConnection('mongodb://localhost:27017/student');
// // 设置数据模型 第二个参数书集合名称
// var monSchema = new mongoose.Schema({
//     name: { type: String, default: "username" },
//     age:{ type: Number },
//     sex: { type: String }
// }, {
//     //{versionKey: false}是干嘛用？如果不加这个设置，我们通过mongoose第一次创建某个集合时，
//     //它会给这个集合设定一个versionKey属性值，这个属性值包含这个文档的内部版本，数据库中显示为_v，如图：
//     versionKey: false,
//     //定死集合 不会自己家s
//     collection: 'student'
// });
// // 数据模型实例  用的是student 集合
// var monModel = db.model('student', monSchema);

//增加
// // 数据集
// var content = { name: "姓名222222222", age: 23, sex: '男' };
// // 实例化对象并插入数据
// var monInsert = new monModel(content);
// monInsert.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('成功插入数据');
//         db.close();
//     }
// });

//删除  
// 要删除的条件
// var del = {
//     name: "111111"
// };

// monModel.remove(del, function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("update");
//     }
//     db.close();
// });

//修改
// 原数据字段值
// var oldValue = {
//     name: "111"
// };
// // 单条件更新
// var newData1 = {
//     $set: {
//         name: "111111111"
//     }
// };
// // 多条件更新
// var newData2 = {
//     $set: {
//         name: "111111",
//         age: 2222
//     }
// };
// //第三个参数是 配置项 {'multi':true} 多条更新
// monModel.update(oldValue, newData2,{'multi':true}, function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("update");
//         db.close();
//     }
// });

//查询
// 选择集合
// var content = {
//     name: "111"
// };
// //返回这3个键的值 其他不显示 field 不加直接显示
// var field = ['name','age','sex'];
// monModel.find(content, field, function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {

//         console.log(result);
//         console.log(result);
//         console.log(result);
//         console.log(result);
//     }
//     db.close();
// });