import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

import CodeEditor from './../js/code_editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
    };
    this.openEditorOption = this.openEditorOption.bind(this);
    this.closeEditorOption = this.closeEditorOption.bind(this);
  }

  componentDidMount() {
    CodeEditor(this.state.socket);
  }

  openEditorOption(e) {
    e.preventDefault();
    document.getElementById('mySidenav').style.width = '300px';
  }

  closeEditorOption(e) {
    e.preventDefault();
    document.getElementById('mySidenav').style.width = '0';
  }

  render() {
    return (
      <div className="editor-wrapper">
        <div id="editor" />
        <ButtonToolbar>
          <span id="editor-option-btn" title="Settings" onClick={this.openEditorOption}>
            &#9776;
          </span>
          <Button id="run-code" bsSize="small" bsStyle="primary">
            Run Code
          </Button>
          <Button id="start-over" bsSize="small" bsStyle="danger">
            Start Over
          </Button>
          <Button id="save" bsSize="small" bsStyle="success">
            Save
          </Button>
        </ButtonToolbar>
        <ul id="solution" />
      </div>
    );
  }
}

export default Editor;
