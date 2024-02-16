import express, {json} from 'express'
const  app = express();
import dotenv from 'dotenv/config'
import {con} from './connection.js'
import bodyParser from "body-parser";
import * as path from "path";
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.set('view engine', 'ejs');
app.use(express.static("views"))

//rout
app.listen(3001, function (){
    console.log('Server is up and running')
})

app.get('/', function (req, res){
    con.query('SELECT * FROM products', function (error,results){
        if (error) throw error;
        res.render("display.ejs", { products: results });
    })})

app.post('/',function (req,res){
    let values = {
        name:req.body.name,
        type:req.body.type,
        price:req.body.price
    };
    con.query('INSERT INTO products set ?', [values], function (err,result){
        if (err) throw err;
        console.log('created successfully!');
        res.redirect('/');
    })
})

app.get("/update", function (req, res){
    con.connect(function (error){

        let id = req.query.id;

        con.query('SELECT * FROM products WHERE id =?;', [id], function (error,result){
            if (error) throw error;

            res.render('update',{products: result});
        })

    })
})
app.post("/updateData", function (req, res){
    let values = {
        name:req.body.name,
        type:req.body.type,
        price:req.body.price,
    };
    let id =req.body.id
    console.log(values)
    con.query('UPDATE products SET ? WHERE id = ?;',[values,id] , function (error,result){
        if (error) throw error;
        console.log('data updated !!!');
        res.redirect('/');
    })
})
app.get("/delete", function (req, res){
     con.connect(function (err){
         if (err) console.log(err);
         let id = req.query.id;
         con.query('DELETE from products WHERE id = ?;', [id],function (error,result){
                if (error) console.log(error)
                res.redirect("/")
         })
     })
})
