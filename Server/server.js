const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Note = require('./model/Note')


const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//connect to mongoos
mongoose.connect('mongodb://localhost/react-note', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("DB connected")).catch(err => console.log(err))

//CREATE
app.post('/newNote', (req, res) => {
    const title = req.body.title
    const note = req.body.note

    const newNote = new Note({
        title, note
    })

    newNote.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.send('created!')
    })
    console.log(newNote)
})

//READ
app.get('/notes', (req, res) => {
    Note.find({}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//UPDATE
app.put('/update/:id', async (req, res) => {
    req.data = await Note.findByIdAndUpdate(req.params.id)
    let data = req.data
    data.title = req.body.title
    data.note = req.body.note

    try {
        await data.save()
        res.send("updated")
    } catch (e) {
        console.log(e)
    }
})

//DELETE
app.delete('/deleteNote/:id', (req, res) => {
    Note.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err)
        }
        res.send("Deleted")
    })
})

app.listen(PORT, () => {
    console.log("server started at port ", PORT)
})