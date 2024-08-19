const mysql=require('mysql2')


var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"@Root123",
    database:"bootstarp"
})

con.connect((err,data)=>{
    if (err) throw err
     console.log("db connected")
})

module.exports=con