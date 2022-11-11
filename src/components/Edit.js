import {itemStateContext} from "./Context";
import React, {useContext, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from 'axios'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function Edit() {
    const {post} = useContext(itemStateContext)
    const [title, setTitle] = useState(post.title);
    const [note, setNote] = useState(post.note);

    const updateSubmit = (id) => {
        const noteObj = {
            title: title,
            note: note
        }

        axios.put(`http://localhost:4000/update/${id}`, noteObj)
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
                        value={title}
                        placeholder="Enter title"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Note</Form.Label>
                    <ReactQuill theme="snow" value={note} onChange={setNote}/>
                </Form.Group>
            </Form>
            <Button
                onClick={() => updateSubmit(post._id)}
                variant='warning'>UPDATE</Button>
        </Container>
    )
}