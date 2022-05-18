const fsPromises = require("fs").promises;
const bcypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./../model/user.json"); 

const userData = {
    users : require("./../model/user.json"),
    setUsers : function(data) {this.users = data}
}

const logIn = async(req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({"message":"Username and Password are required"});
    const checkUser = userData.users.find( person => person.username === user);
    if (!checkUser) return res.sendStatus(401);
    const match = await bcypt.compare(pwd, checkUser.password);

    if (match){
        res.json({"message":`User ${user} is logged in.`});
        console.log(user);
    } else{
        res.sendStatus(401);
    }
}


module.exports = { logIn };