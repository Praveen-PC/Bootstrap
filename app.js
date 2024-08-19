const express=require('express')
const bodyparser=require('body-parser')
const db=require('./db')


const app=express()
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    var sql="select * from bootstarp.userdata"
    db.query(sql,(err,result)=>{
        if (err) throw err
        res.render('index',{
            db:result
        })
    })
})

app.post('/',(req,res)=>{
    var {username,email,phone,city}=req.body
    var sql='insert into bootstarp.userdata (username,email,phone,city) values (?,?,?,?)'
    db.query(sql,[username,email,phone,city],(err,result)=>{
        if (err) throw err
        console.log('values is inserted')
        res.redirect('/')
    })
})

app.get('/edit/:userid',(req,res)=>{
    var {userid}=req.params
    var sql='select * from bootstarp.userdata where userid=?'
    db.query(sql,[userid],(err,result)=>{
        if (err) throw err
        res.render('edituser',{
            value:result[0]

        })
    })
})

app.post('/edit/:userid',(req,res)=>{
    var {userid}=req.params
    var {username,email,phone,city}=req.body 

    const sql='update bootstarp.userdata set username=?,email=?,phone=?,city=? where userid=?'
    db.query(sql,[username,email,phone,city,userid],(err,result)=>{
        if (err) throw err
        res.redirect('/')
    })
})


app.get('/delete/:userid',(req,res)=>{
    var {userid}=req.params
    var sql='delete from bootstarp.userdata where userid=?'
    db.query(sql,[userid],(err,result)=>{
        if (err) throw err
        res.redirect('/')
        console.log('deta is deleted'+result)
    })
})


const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})