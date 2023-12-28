const express=require("express");
const app=express();
const port=3000;
const path=require("path");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

//for getting uniques ids
const {v4:uuidv4}=require('uuid');

//client and frontend se data parse krne keliye
app.use(express.urlencoded({extended: true}));

//set view engine to ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


//for static files in public folder like css
app.use(express.static(path.join(__dirname,"public")));


//creating highlighted post of year 2023
let posts=[
    {
    id:uuidv4(),
    username:"Virat Kohli",
    comment:"God has never written a better script for a cricketer.Most runs in ODI World Cup ,surpassing Sachin "
    },
    {
    id:uuidv4(),
    username:"YO YO Honey Singh",
    comment:"Breaking records in style! What a comeback!"
    },
    {
    id:uuidv4(),
    username:"Narendra Modi(PM)",
    comment:"Interacting with the young innovators at the Grand Finale of Smart India Hackathon 2023.Their problem-solving capabilities & ingenuity to address complex challanges is remarkable."
    },
];


//comments of all users
let comments=[
    {
    id:posts[0].id,
    id1:uuidv4(),
    username:"Yuvraj singh",
    comment:"Outstanding Performance",
    },
  {
      id:posts[0].id,
      id1:uuidv4(),
      username:"Sachin Tendulkar",
      comment:"God gifted player",
  },

  {
      id:posts[0].id,
      id1:uuidv4(),
      username:"Gautum gambhir",
      comment:"Took-took player",
  },
    {
        id:posts[1].id,
        id1:uuidv4(),
        username:"Arjit Singh",
        comment:"Where words fail,music feels!",
    },
    {
        id:posts[1].id,
        id1:uuidv4(),
        username:"Mc-Stan",
        comment:"You have a unique singing style",  
    },
    {
        id:posts[1].id,
        id1:uuidv4(),
        username:"Badshah",
        comment:"Kuch logonka comeback kyu nhi ho rha",  
    },

    {
        id:posts[2].id,
        id1:uuidv4(),
        username:"Nitin Gadkari",
        comment:"Next level generation",
    },
    {
        id:posts[2].id,
        id1:uuidv4(),
        username:"Arvind Kejriwal",
        comment:"aatmnirbhar bharat leading generation",  
    },
];

//posts ko render kro
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


//creating form for new posts
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


//new post submit hone ke baad use redirect kr rha hu
app.post("/posts",(req,res)=>{
    let {username,comment}=req.body;
    let id=uuidv4();
    posts.push({id,username,comment});
    res.redirect("/posts");
});


//to view all comments
app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let commentsSee=[];
   //let stmt=comments.find((c)=>id===c.id);
   for (let i = 0; i < comments.length; i++) {
    if (comments[i].id ===  id) {
      commentsSee.push(comments[i]);
    }
  }
   let post=posts.find((p)=>id===p.id);
   res.render("show.ejs",{post,commentsSee,posts});
});


//edit krne wali ka route krte hai
app.get("/posts/:id/edit",(req,res)=>{
   let {id}=req.params;
   let stmts=comments.find((c)=>id===c.id1);
   res.render("edit.ejs",{stmts,posts});
});



//patch krte hai means update
app.patch("/posts/:id",(req,res)=>{
    let newComment=req.body.comment;
    let {id}=req.params;
    stmts=comments.find((c)=>id===c.id1);
    stmts.comment=newComment;
    res.redirect("/posts");
});



//delete some comments
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    //is id wali post ko chod kr baki sare post rhenge
    comments=comments.filter((c)=>id!==c.id1); 
    res.redirect("/posts");  
});


//listen 
app.listen(port,()=>{
   console.log(`post is listening at port :3000`);
});