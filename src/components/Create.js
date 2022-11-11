import React, {useState} from "react";
import axios from 'axios'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Button, Container, Form} from "react-bootstrap";

export default function Create() {
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')


    const handleSubmit = () => {
        const noteObj = {
            title: title,
            note: note
        }

        axios.post(`http://localhost:4000/newNote`, noteObj)
            .then(() => {
                alert("Submitted")
            })
    }
    
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter title"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Note</Form.Label>
                    <ReactQuill theme="snow" value={note} onChange={setNote}/>
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit} variant='warning'>SUBMIT</Button>
        </Container>
    )
}