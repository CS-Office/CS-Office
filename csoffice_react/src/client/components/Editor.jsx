import React, { Component } from 'react';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import CodeEditor from './../js/code_editor';
import EditorOptions from './../components/EditorOptions';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: this.props.socket,
      editor: null,
    };

    this.openEditorOption = this.openEditorOption.bind(this);
    this.closeEditorOption = this.closeEditorOption.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.toggleVideoWindow = this.toggleVideoWindow.bind(this);
  }

  componentDidMount() {
    const newEditor = new CodeEditor(this.props.socket);
    this.setState({ ...this.state, editor: newEditor });
  }

  openEditorOption(e) {
    e.preventDefault();
    document.getElementById('mySidenav').style.width = '300px';
  }

  closeEditorOption(e) {
    e.preventDefault();
    document.getElementById('mySidenav').style.width = '0';
  }

  changeTheme(e) {
    this.state.editor.changeTheme(e.target.value);
  }

  changeFont(e) {
    console.log('This is the change font !!!!');
    this.state.editor.changeFont(e.target.value);
  }

  toggleVideoWindow(e) {
    document.querySelector('.video-container').classList.toggle('hidden');
  }

  render() {
    return (
      <div className="editor-wrapper">
        <EditorOptions
          closeEditorOption={this.closeEditorOption}
          changeTheme={this.changeTheme}
          changeFont={this.changeFont}
        />
        <div id="editor" />
        <ButtonToolbar id="editor-button-container">
          <Button
            id="editor-option-btn"
            className="icon-button"
            title="Settings"
            bsSize="large"
            onClick={this.openEditorOption}
          >
            <Glyphicon glyph="cog" />
          </Button>
          <Button
            id="open-video-chat"
            title="Open video"
            bsSize="small"
            bsStyle="info"
            onClick={this.toggleVideoWindow}
          >
            <Glyphicon glyph="facetime-video" bsStyle="success" />
          </Button>
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
