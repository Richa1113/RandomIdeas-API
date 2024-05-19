const express = require("express");
const app = express();
const port = 5000;

const ideas =[
    {
        id : 1,
        text : "this is idea 1",
        tag : "Business",
        username : "Richa",
        date : "2022-05-18"

    },
    {
        id : 2,
        text : "this is idea 2",
        tag : "Technnology",
        username : "Tony",
        date : "2022-05-11"

    },
    {
        id : 3,
        text : "this is idea 3",
        tag : "Invention",
        username : "Brad",
        date : "2022-04-18"

    },
]
app.get("/", (req, res)=> {
    res.send({ message : "Welcome to the RandomIdeas app"});
});

//Get all ideas
app.get("/api/ideas", (req, res) => {
    res.json({ success: true, data: ideas});
});

//Get ideas of particular id
app.get("/api/ideas/:id", (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);
    if(!idea)
        {
            return res.status(404).json({ success : false, error : "resource not found"});
        }
    res.json({ success: true, data: idea });
});

app.listen(port, ()=>  console.log(`server listening on port ${port}`));