print("Started adding the users.");
db = db.getSiblingDB("admin");
db.createUser({
    user: "cadmin",
    pwd: "cadmin",
    roles: [{ role: "readWrite", db: "admin" }],
});
print("End adding the user roles.");
