import React, { Component } from 'react';
import "../css/main.css";

import LoginPage from './LoginPage.jsx';
import SignUp from './SignUp.jsx';
import Navbar from './Navbar.jsx';
import Logo from './Logo.jsx';
import CodeEditor from './CodeEditor.jsx';
import SolutionBox from './SolutionBox.jsx';
import ChatBox from './ChatBox.jsx';
import ChatInput from './ChatInput.jsx';
import AdminPage from './AdminPage.jsx';

import Video from './Video.jsx';

class App extends Component {
  render () {
    return (
      <div>
        <LoginPage/>
        <SignUp />
        <Navbar />
        <CodeEditor />
        <Video />
        <ChatBox />
        <AdminPage /> 
      </div>
    )
  }
}

export default App;
