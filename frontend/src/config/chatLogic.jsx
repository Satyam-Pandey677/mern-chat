export const getSender = (loggedUser, users) => {
    console.log(loggedUser)
    console.log(users)
    return users[0]._id === loggedUser._Id? users[1].username : users[0].username
}

export const getSenderfull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id? users[0] : users[1]
}