import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

const EditorOption = props => (
  <div id="mySidenav" className="sidenav">
    <a href="#" className="closebtn" onClick={props.closeEditorOption}>
      &times;
    </a>
    <div id="options-container">
      <label className="editor-options">Themes</label>
      <select className="editor-options">
        <option value="">3024-day</option>
        <option value="saab">3024-night</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <label className="editor-options">Font Size</label>
      <select className="editor-options">
        <option value="">10</option>
        <option value="">12</option>
        <option value="saab">14</option>
        <option value="mercedes">16</option>
        <option value="audi">18</option>
      </select>
      <label className="editor-options">Key Map</label>
      <select className="editor-options">
        <option value="">Sublime</option>
        <option value="saab">VIM</option>
        <option value="mercedes">EMACS</option>
      </select>
    </div>
  </div>
);

export default EditorOption;
