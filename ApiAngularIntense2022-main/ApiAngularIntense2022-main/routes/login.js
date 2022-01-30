let Users = require('../model/users');
const md5 = require('md5');


function postLogin(req, res){
    let username = req.body.username;
    let clearpassword = req.body.password;
    let password = md5(clearpassword);

    Users.findOne({username: username, password: password}, (err, user) =>{
        if(err){res.send(err)}
        if(user){
            res.json({id: user._id, username: user.username});
        }
        else{
            res.send("wrong username/password");
        }
    })


}


module.exports = { postLogin };