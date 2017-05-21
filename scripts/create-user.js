db.createUser(
{
    user: "yeah",
    pwd: "yeah",
    roles: [
      { role: "readWrite", db: "weirdydb" }
    ]
});