import './App.css';   
import Footer from './commponents/Footer'; 
import {Routes, Route, } from 'react-router-dom';
import SignUp from './commponents/SignUp'; 
import LogIn from './commponents/LogIn';  
// import Header from './commponents/Header';
import Main from './commponents/Main';
import Home from "./routes/Home";
import Calendar from "./routes/Calendar";
import Feed from "./routes/Feed";
import Navbar from './commponents/Navbar';
import useNode from "./hooks/useNode";
import { useState } from "react";
import "./styles.css";
import Comment from './commponents/Comment';


const comments = {
  id: 1,
  items: [],
};
  const App = () => {
    
    const [commentsData, setCommentsData] = useState(comments);
  
    const { insertNode, editNode, deleteNode } = useNode();
  
    const handleInsertNode = (folderId, item) => {
      const finalStructure = insertNode(commentsData, folderId, item);
      setCommentsData(finalStructure);
    };
  
    const handleEditNode = (folderId, value) => {
      const finalStructure = editNode(commentsData, folderId, value);
      setCommentsData(finalStructure);
    };
  
    const handleDeleteNode = (folderId) => {
      const finalStructure = deleteNode(commentsData, folderId);
      const temp = { ...finalStructure };
      setCommentsData(temp);
    };
  
  
   return ( 
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={
            <Main/>
          }/>
          <Route path="/signup" element={
            <SignUp/>
          }/>
          <Route path="/login" element={
          <LogIn/>
          } />
          <Route path="/" element={
          <Home/>
          } />
          <Route path="/calendar" element={
          <Calendar/>
          } />
          <Route path="/feed" element={
          <Feed/>
          } />
          <Route path="/comment" element={
          <Comment
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}/>
          } />

    </Routes>       
    <Footer/>
        
      </> 
  );
}


export default App;
