var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/clob', { useNewUrlParser: true });

// 建立模型
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    created_time: {
        type: Date,
        // 此处不要写(), 表示定义一个表达式，只有当创建实例的时候才获取
        // 当时的时间
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        // 0 男
        // 1 女
        // -1 保密
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthDay: {
        type: Date,
        default: ''
    },
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);