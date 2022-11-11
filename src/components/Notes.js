import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Card, Container} from "react-bootstrap";
import axios from "axios";
import parse from 'html-react-parser'
import {itemStateContext} from "./Context";
import {Link} from "react-router-dom";

export default function Notes() {
    const [items, setItems] = useState([])
    const {setPost} = useContext(itemStateContext);

    useEffect(() => {
        axios.get(`http://localhost:4000/notes`)
            .then((res) => setItems(res.data))
            .catch((err) => console.log(err))
    }, []);

    function DeleteNote(_id) {
        axios.delete(`http://localhost:4000/deleteNote/${_id}`)
            .then(() => {
                window.location.reload()
            })
    }

    const elementMap = items.map((element, index) => {
        return (
            <Fragment key={index}>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Text>{parse(element.note)}</Card.Text>
                        <Button
                            onClick={() => DeleteNote(element._id)}
                            variant="danger">Delete</Button>
                        <Link to="/Edit">
                            <Button
                                onClick={() => setPost(element)}
                                variant="warning">Update</Button>
                        </Link>
                        <p>Created At:{element.creatAt}</p>
                    </Card.Body>
                </Card>
            </Fragment>
        )

    })

    return (
        <Container>
            {elementMap}
        </Container>
    )
}