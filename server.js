require("dotenv").config()
const express = require("express")

const app = express()

app.use(express.json())
let tasks = [
    {
        id: 1,
        title: "Learn React",
        completed: false
    },
    {
        id: 2,
        title: "Learn REST API",
        completed: false
    }
]
app.get("/", (req, res) => {
    res.json({
        message: "API is working"
    })
})

    app.get("/tasks", (req,res)=>{
        res.json(tasks)
    })
app.get("/tasks/:id",(req,res)=>{
    const id= Number(req.params.id)
    const task= tasks.find(task=>task.id===id);
    if(!task){
        return res.status(404).json({
            message: "task not found"
        })
    }
    res.json(task)
})
    app.post("/tasks", (req,res)=>{
        const {title}= req.body;
        const newTask= {
            id:Date.now(),
            title: title,
            completed: false
        }
        tasks.push(newTask);
        res.status(201).json(newTask)

    })
    app.put("/tasks/:id",(req,res)=>{
        const id= Number(req.params.id)
        const task= tasks.find(task=>task.id===id);
        if(!task){
            return res.status(404).json({
                message: "task not found"
            })

        }
      if(req.body.title !== undefined) task.title= req.body.title;
       if(req.body.completed !== undefined) task.completed = req.body.completed;
        res.json(task);
    })
    app.delete("/tasks/:id", (req,res)=>{
        const id = Number(req.params.id)
        const index= tasks.findIndex(task=>task.id===id)
        if(index=== -1){
            return res.status(404).json({
                message: "Task not Found"
            })
        }
        const deletedTask= tasks.splice(index,1)
        res.json(deletedTask[0]);
    })
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})