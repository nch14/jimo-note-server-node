var sqlite3 = require('sqlite3');
var userRepository;
var db = new sqlite3.Database('../database/jimo.db');

function findOne(id) {
    let result;
    db.all("select * from user where id = " + id, function (err, res) {
        if (!err)
            result = res;
        else
            console.log(err);
    });
    return result;
}

function insert(user) {
    var result;
    db.run(`INSERT INTO user (name , pwd) VALUES ( "${user.name}" , "${user.pwd}");`,async function (err) {
        if (err)
            return false;
        else{
            result = this.lastID;
            return this.lastID;
        }
    });
    console.log('result',result)
}

//findOne(1);
var result = insert({name: 'wangyue00dgkjj', pwd: '233333'});
console.log(result);


/*
var db = new sqlite3.Database('../database/jimo.db',function() {
   /!* db.run("create table test(name varchar(15))",function(){
        db.run("insert into test values('hello,world')",function(){
            db.all("select * from test",function(err,res){
                if(!err)
                    console.log(JSON.stringify(res));
                else
                    console.log(err);
            });
        })
    });*!/
    db.all("select * from user",function(err,res){
        if(!err)
            console.log(JSON.stringify(res));
        else
            console.log(err);
    });
});
*/

module.exports = userRepository;