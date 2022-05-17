const fsPromises = require("fs").promises;
const bcypt = require("bcrypt");
const path = require("path");
const User = require("./../model/user.json");

const userData = {
    users : require("../model/user.json"),
    setUsers : function (data) {this.users = data}
}

const SignUp = async(req, res) => {
    const {user, pwd} = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Email, Username and Password are required'});
    const user_exists = userData.setUsers.find(person => person.username === user);
    if (user_exists) return req.sendStatus(409);
    try {
        const hashedPassword = await bcypt.hash(pwd, 10);
        const createUser = ({
            "username" : user,
            "password" : hashedPassword
        });
        userData.setUsers([...userData.users, createUser]);
        await fsPromises.writeFile(path.join(__dirname, "..", 'model', 'user.json'), JSON.stringify(userData.users));
        console.log(userData.users);
        res.status(201).json({ 'success' : `New user of email ${email} created`});
    } catch (err) {
        res.status(500).json({ 'message' : err.message });
    }

};

module.exports = { SignUp };