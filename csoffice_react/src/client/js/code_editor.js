const CodeEditor = function(socket) {
  let worker; 
  // socket.io - Enables real-time bidirectional event-based communication
  //   socket = io.connect('http://localhost:3000');
  //   var socket = new WebSocket({ url: 'ws://' + window.location.host });
  //   var socket = new WebSocket('ws://' + window.location.host);

  // console.log('========= IM INSIDE CODE_EDITOR.JS ===========', socket);
  // helper function for xmlHttpRequest();
  function getURL(url, c) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status < 400) return c(null, xhr.responseText);
      const e = new Error(xhr.responseText || 'No response');
      e.status = xhr.status;
      c(e);
    };
  }

  // tern - addon that brings autocomplete functionality
  getURL('http://ternjs.net/defs/ecmascript.json', (err, code) => {
    if (err) throw new Error(`Request for ecmascript.json: ${err}`);
    const server = new CodeMirror.TernServer({ defs: [JSON.parse(code)] });
    editor.setOption('extraKeys', {
      'Ctrl-Space': function(cm) {
        server.complete(cm);
      },
      'Cmd-Space': function(cm) {
        server.complete(cm);
      },
      'Ctrl-I': function(cm) {
        server.showType(cm);
      },
      'Ctrl-O': function(cm) {
        server.showDocs(cm);
      },
      'Alt-.': function(cm) {
        server.jumpToDef(cm);
      },
      'Alt-,': function(cm) {
        server.jumpBack(cm);
      },
      'Ctrl-Q': function(cm) {
        server.rename(cm);
      },
      'Ctrl-.': function(cm) {
        server.selectName(cm);
      },
    });
    editor.on('cursorActivity', (cm) => {
      server.updateArgHints(cm);
    });
  });

  // CodeMirror
  let editor = CodeMirror(document.querySelector('#editor'), {
    value: '// Type JavaScript here and click "Run Code" \n \nconsole.log("Hello, world!");',
    mode: 'javascript',
    lineNumbers: true,
    indentWithTabs: true,
    indentUnit: 4,
    matchBrackets: true,
    autoCloseBrackets: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    lint: {
      esversion: 6,
    },
    styleActiveLine: true,
  });

  // Event Handler for editor changes
  editor.on('change', (cMirror) => {
    const code = cMirror.getValue();
    socket.emit('send code change', code);
  });

  //   socket.onmessage = function(msg) {
  //     console.log('WE RECEIVED A MESSAGE === ', msg);
  //   };

  socket.on('send code change', updateEditor);

  function updateEditor(data) {
    const code = editor.getValue();
    if (code !== data) {
      editor.getDoc().setValue(data);
    }
  }

  // Event Handler for "Run Code"
  document.querySelector('#run-code').addEventListener('click', (e) => {
    document.querySelector('#solution').innerHTML = '';
    const con =
      "const console = { log: function (callback) { if (typeof callback === 'function') callback = callback.toString(); return postMessage(callback);}};";
    const code = editor.getValue();

    const s = `onmessage = (e) => {
            try {
                eval(e.data);
            }
            catch (error) {
               let errorName = '';
               const regExp = /\\d+:\\d+/gi;
               const errorLine = error.stack.match(regExp)[1];
               const lineNum = parseInt(errorLine);
               if (error instanceof ReferenceError) {
                 errorName = 'ReferenceError';
                 postMessage(errorName + ' on line ' + lineNum + ': ' + error.message);
               }
               else if (error instanceof SyntaxError) {
                 errorName = 'SyntaxError';
                postMessage(errorName + ': ' + error.message);
               }
               else if (error instanceof TypeError) {
                 errorName = 'TypeError';
                 postMessage(errorName + ' on line ' + lineNum + ': ' + error.message);
               }
            }
        };`;

    const newBlob = new Blob([s], { type: 'text/javascript' });
    const blobURL = URL.createObjectURL(newBlob);
    if (worker) worker.terminate();
    worker = new Worker(blobURL);

    worker.onmessage = function(e) {
      const li = document.createElement('li');

      if (typeof e.data === 'string') {
        li.textContent = `'${e.data}'`;
      } else if (Array.isArray(e.data)) {
        li.textContent = JSON.stringify(e.data, null, ' ');
      } else if (typeof e.data === 'object') {
        const text = JSON.stringify(e.data, null, ' ').replace(/\"(\w+)\":/g, '$1:');
        li.textContent = text;
      } else {
        li.textContent = `${e.data}`;
      }
      document.querySelector('#solution').appendChild(li)
    };

    worker.postMessage(`${con}${code}`);
  });
};

export default CodeEditor;
