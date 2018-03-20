import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
// import { UnControlled as CodeMirror } from 'react-codemirror2';
import CodeEditor from './../js/code_editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props,
    };
  }

  componentDidMount() {
    CodeEditor(this.state.socket);
  }

  render() {
    return (
      <div className="editor-wrapper">
        <div id="editor" />
        <ButtonToolbar>
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
