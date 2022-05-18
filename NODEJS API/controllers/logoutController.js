const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

const userData = {
    users  : require("./../model/user.json"),
    setUsers : function(data) {this.users = data}
}

const logOut = async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const userExists = userData.users.find(person => person.refreshToken === refreshToken);

    if(!userExists){
        res.clearCookie("jwt",{ httpOnly : true, sameSite : "None", secure: true});
        return res.sendStatus(204)
    }
    const otherUsers = userData.users.filter(person => person.refreshToken !== userExists.refreshToken);
    const currentUser = {...userExists, refreshToken:""};
    userData.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userData.users));

    res.clearCookie('jwt', { httpOnly : true, sameSite : 'None', secure : true });
    res.sendStatus(204)
}

module.exports = {logOut};