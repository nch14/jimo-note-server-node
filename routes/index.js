var express = require('express');
var router = express.Router();
var UserRepository = require('../dao/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/register', function (req, res, next) {
    let user = {
        name: req.query.name,
        pwd: req.query.pwd,
        nickName: req.query.nickName
    };

    UserRepository.insert(user).then((val) => {
        if (val) {
            let result = {code: 200, data: val, msg: '注册成功'};
            res.send(JSON.stringify(result));
        } else {
            let result = {code: 400, data: false};
            res.send(JSON.stringify(result));
        }
    }).catch(err => {
        console.log('error', err)
        res.send('fail')
    });

});

router.get('/login', function (req, res, next) {
    var username = req.query.name;
    var pwd = req.query.pwd;
    UserRepository.findByUsername(username).then((val) => {
        if (val[0].pwd == pwd) {
            let result = {code: 200, data: val[0]};
            res.send(JSON.stringify(result));
        } else {
            let result = {code: 400, data: false};
            res.send(JSON.stringify(result));
        }
    }).catch(err => {
        console.log('error', err);
        res.send('fail')
    });

});

module.exports = router;
