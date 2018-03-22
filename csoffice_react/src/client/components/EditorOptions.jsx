import React from 'react';

const EditorOptions = props => (
  <div id="mySidenav" className="sidenav">
    <a href="#" className="closebtn" title="Close Editor Options" onClick={props.closeEditorOption}>
      &times;
    </a>
    <div id="options-container">
      <label className="editor-options">Themes</label>
      <select id="theme-option" className="editor-options" onChange={props.changeTheme}>
        <option value="3024-day">3024-day</option>
        <option value="3024-night">3024-night</option>
        <option value="mdn-like">MDN-Like</option>
        <option value="eclipse">Eclipse</option>
      </select>
      <label className="editor-options">Font Size</label>
      <select id="font-option" className="editor-options">
        <option value="">10</option>
        <option value="">12</option>
        <option value="saab">14</option>
        <option value="mercedes">16</option>
        <option value="audi">18</option>
      </select>
      <label className="editor-options">Key Map</label>
      <select id="keymap-option" className="editor-options">
        <option value="">Sublime</option>
        <option value="saab">VIM</option>
        <option value="mercedes">EMACS</option>
      </select>
    </div>
  </div>
);

export default EditorOptions;
