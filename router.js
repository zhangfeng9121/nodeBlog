var express = require('express');
var User = require('./models/user.js');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('index.html');
});

router.get('/login', function(req, res) {
    res.render('login.html');
});

router.get('/register', function(req, res) {
    res.render('register.html');
});

router.post('/register', function(req, res) {
    var registerUser = req.body;

    User.findOne({
        $or: [
            { email: registerUser.email },
            { nickname: registerUser.nickname }
        ]
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err_code: -1,
                message: 'server is error!'
            })
        }

        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname aleady exists.'
            })
            return res.send(`邮箱或者密码已存在，请重试`)
        }
    })

    new User(registerUser).save(function(err, user) {
        if (err) {
            return res.status(500).json({
                err_code: -1,
                message: 'server is error!'
            })
        }
        // Express 提供了一个响应方法：json
        // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })

        // 服务端重定向只针对同步请求才有效，异步请求无效
        // res.redirect('/')
    })
});

module.exports = router;