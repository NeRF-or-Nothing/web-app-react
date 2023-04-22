import React, {useState} from "react";
import "./Community.css";
import NavBar from "../NavbarLink/NavbarLink";
import EachPost from "../EachPost/EachPost";
import Button from 'react-bootstrap/Button';
import { FileUploader } from "react-drag-drop-files";
import Modal from 'react-bootstrap/Modal';
const fileTypes = ["MP4,MOV"];
export default function Community(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return(
        <div>
            <NavBar/>
        <div className="mainDiv">
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <Button variant="primary" onClick={handleShow}>
                Post
            </Button>
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard="false"
            >
                <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input id="inputText"/>
            <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        style={{margin:"auto"}}
      />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="postButton">Post</Button>
        </Modal.Footer>
            </Modal>
        </div>
        </div>
    )
}