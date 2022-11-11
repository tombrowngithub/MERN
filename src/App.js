import React, {useState} from "react";
import {Route, Routes} from 'react-router-dom'
import Navs from './components/Navs'
import Notes from './components/Notes'
import Edit from './components/Edit'
import Create from './components/Create'
import {itemStateContext} from "./components/Context";

export default function App() {
    const [post, setPost] = useState([])
    return (
        <div className="App">
            <itemStateContext.Provider value={{post, setPost}}>
                <Navs/>
                <Routes>
                    <Route path='Create' element={<Create/>}/>
                    <Route path='/' element={<Notes/>}/>
                    <Route path='Note' element={<Notes/>}/>
                    <Route path='Edit' element={<Edit/>}/>
                </Routes>
            </itemStateContext.Provider>

        </div>
    )
}