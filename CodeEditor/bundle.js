(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
window.onload = function ()  {
    function getURL(url, c) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status < 400) return c(null, xhr.responseText);
            var e = new Error(xhr.responseText || "No response");
            e.status = xhr.status;
            c(e);
        };
    }

    getURL("http://ternjs.net/defs/ecmascript.json", function (err, code) {
        if (err) throw new Error("Request for ecmascript.json: " + err);
        server = new CodeMirror.TernServer({ defs: [JSON.parse(code)] });
        editor.setOption("extraKeys", {
            "Ctrl-Space": function (cm) { server.complete(cm); },
            "Cmd-Space": function (cm) { server.complete(cm); },
            "Ctrl-I": function (cm) { server.showType(cm); },
            "Ctrl-O": function (cm) { server.showDocs(cm); },
            "Alt-.": function (cm) { server.jumpToDef(cm); },
            "Alt-,": function (cm) { server.jumpBack(cm); },
            "Ctrl-Q": function (cm) { server.rename(cm); },
            "Ctrl-.": function (cm) { server.selectName(cm); }
        })
        editor.on("cursorActivity", function (cm) { server.updateArgHints(cm); });
    });

    let editor = CodeMirror(document.querySelector('#editor'), {
        value: '// Type JavaScript here and click "Run Code" \n \nconsole.log("Hello, world!");',
        mode: "javascript",
        lineNumbers: true,
        indentWithTabs: true,
        indentUnit: 4,
        matchBrackets: true,
        autoCloseBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        lint: {
            esversion: 6
        },
        styleActiveLine: true
    });
    
    document.querySelector('#run-code').addEventListener('click', (e) => {
        const con = `const console = { log: function (callback) { if (typeof callback === 'function') callback = callback.toString(); return postMessage(callback);}};`;
        
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
        const worker = new Worker(blobURL);
      
        worker.onmessage = function (e) {
            const li = document.createElement('li');

            if (typeof e.data === 'string') {
                li.textContent = `'${e.data}'`;
            } 
            else if (Array.isArray(e.data)) {
                li.textContent = JSON.stringify(e.data, null, ' ');
            }
            else if (typeof e.data === 'object') {
                const text = JSON.stringify(e.data, null, ' ').replace(/\"(\w+)\":/g,"$1:");
                li.textContent = text;
            }
            else {
                li.textContent = `${e.data}`;
            }
            document.querySelector('#results').appendChild(li);
            this.terminate();
        };
        
        worker.postMessage(`${con}${code}`);
     }); 
}



},{}]},{},[1]);
