const express = require('express');
const http = require('http');
const app = express();
app.use(express.static(__dirname));
const uuidv4 = require('uuid').v4;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());


/*

We would use this for database connecting 


const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
var dbConn = client.connect();
app.post('/',function(req,res){
    console.log("//NewData// Name: "+req.body.fname);
    console.log("//NewData// Card Number: "+ req.body.cnumber);
    console.log("//NewData// CVV: "+req.body.cvv);
    
    dbConn.then(function(){
        db = client.db("appdb");
        db.collection('users').insertOne(req.body).then(console.log("data sent"));
    })

   
    res.sendFile(__dirname+'/index.html');
})

app.get('/showCards',function(req,res){
    dbConn.then(function(){
        db = client.db("appdb");
        db.collection('users').find({}).toArray().then(function(users){
            res.json(users);
        })
    })
}) */


var userList = [{username:"admin",password:"admin"},
{username:"dimosthenis",password:"123456789"},
{username:"marios",password:"987654321"},
{username:"examiner",password:"326159487"}
];

var carts={};



const sessions={}
//Checks Login Form Post
app.post('/',function(req,res){
    if(req.url == "/"){
        var userfound = false;
        console.log(req.body.username);
        const {username , password} = req.body;
        
        for(var i = 0; i<userList.length ; i++){
            if(username==userList[i].username && password == userList[i].password){
                userfound=true;
            }
        }
    
        if(userfound){
            const sessionId = uuidv4();
            sessions[sessionId] = {username , userId:1};
            console.log(sessions);
            res.set('Set-Cookie',`session=${sessionId}`);
            let answer = JSON.stringify({"sessionId": sessionId, "username":username} );
            
            res.send(answer);
        }
        else{
            res.status(401).send(JSON.stringify("Invalid Username Or Password"));
        }
  
    }
    
});


app.get('/auth',function(req,res){
   let sessionId;
    if(req.headers.cookie!=undefined){
        
         sessionId = req.headers.cookie.split('=')[1];
    }else{
         sessionId = -404;
    }
    
    
      const userSession = sessions[sessionId];
      if(!userSession){
        
        res.status(401).send(JSON.stringify("No user session"));
      }else{
        let answer = JSON.stringify({"sessionId":sessionId , "username":userSession.username} );
       
        
        res.send( answer);
        
      }

});

app.get('/logout',function(req,res){
    const sessionId=req.headers.cookie.split('=')[1];
    delete sessions[sessionId];
    res.set('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.send('Success');


});




app.get('/',function(req,res){

  //res.sendFile('index.html',{ root : '/home/dimosthenis-work/Desktop/Texnologies_Ston_Isto/Testing/'});
  if(req.url == "/"){
      
      console.log(__dirname+'index.html');
      res.sendFile(__dirname+'index.html');

  }
});

//Cart service

app.post('/addProduct',function(req,res){
    //Check Who Post This
    const sessionId = req.headers.cookie.split('=')[1];
    
      const userSession = sessions[sessionId];
      if(!userSession){
        
        res.status(401).send(JSON.stringify("No user session"));
      }else{


    
        let contentType= req.header('Content-Type');
        let newItem = req.body;
        let userName=sessions[sessionId].username;

        //If the user doesnt have a cart create cart 
        if(!carts[userName]){
            carts[userName] = {
                "cartItems":[{"title":newItem.title, "cost":newItem.cost,"quantity":1}],
                "totalCost":newItem.cost

            };
            
        }else{


            let myCartItems = carts[userName].cartItems;
            
            let found = false;
            for(let i=0; i<myCartItems.length;i++){

                if(myCartItems[i].title == newItem.title){
                    found = true;
                    myCartItems[i].quantity++;
                    break;
                }

            }
            if(found == false){
                myCartItems.push({"title":newItem.title, "cost":newItem.cost,"quantity":1});

            }
            
            carts[userName].totalCost = carts[userName].totalCost + newItem.cost;





        }

        console.log(carts[userName]);
      


        let answer = JSON.stringify({"sessionId":sessionId , "username":userSession.username} );
        
        
        res.send( answer);
        


      }



});



app.get('/cart',function(req,res){

    const sessionId = req.headers.cookie.split('=')[1];
    
    const userSession = sessions[sessionId];
    if(!userSession){
      
      res.status(401).send(JSON.stringify("No user session"));
    }else{ 
      let userName = sessions[sessionId].username;
      let carr = JSON.stringify(carts[userName]);
     
      
      res.send( carr);
      
    }



});










app.listen(9090, () => {
  console.log('Server running on port 9090');
});
