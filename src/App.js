import React, { Component } from 'react';
import logo from './logo.svg';
import brace from 'brace';
import AceEditor from 'react-ace';
import ReactDOM from 'react-dom';
import JsonFormat from 'json-format';
import JsonQuery from 'json-query';
import copy from 'copy-to-clipboard';

import 'brace/mode/java';
import 'brace/theme/monokai';
import './App.css';

class App extends Component {

  onEditor1Change(i) {
    this.state.value = i
  }

  /** 
   * sort string base on line
  */
  sort_lines() {
    var val = this.state.value
    this.renderOutput(val.split(/\r?\n/).sort().join("\n"))
  }

  /**
   * remove duplicates from multiple lines
   */
  remove_duplicate() {
    var set = {};
    var val = this.state.value    
    var distinct = Array.from(new Set(val.split(/\r?\n/)))
    this.renderOutput(distinct.sort().join("\n"))
  }

  /**
   * replace all comms with newline characters
   */
  comma_to_newline() {
    var val = this.state.value;
    this.renderOutput(val.replace(/,/g,"\n"))
  }

  /**
   * replace all newline characters with commas
   */
  newline_to_comma() {
    var val = this.state.value;
    this.renderOutput(val.replace(/\r?\n/g,","))
  }

  /**
   * remove all newline characters
   */
  remove_newline() {
    var val = this.state.value;
    this.renderOutput(val.replace(/\r?\n/g,''))
  }

  /**
   * urlencode
   */
  url_encode() {
    var val = this.state.value;
    this.renderOutput(encodeURI(val))
  }

  /**
   * urldecode
   */
  url_decode() {
    var val = this.state.value;
    this.renderOutput(decodeURI(val))
  }

  /** 
   * java and .net escape
   * */ 
  java_escape() {
    var val = this.state.value;
    var result = val.replace(/\\/g,"\\\\")
                      .replace(/\f/g,"\\f")
                      .replace(/\n/g,"\\n")
                      .replace(/\r/g,"\\r")
                      .replace(/\t/g,"\\t")
                      .replace(/\'/g,"\\\'")
                      .replace(/\"/g,"\\\"")
    this.renderOutput(result)
  }

  /** 
   * java and .net unescape
   * */ 
  java_unescape() {
    var val = this.state.value;
    var result = "";
    for(var i = 0; i < val.length; i++) {
      if(val.charAt(i) == "\\") {
        var toAdd = "";
        switch(val.charAt(i+1)){
          case '\\': result += '\\'; break;
          case 'n': result += '\n'; break;
          case 'r': result += '\r'; break;
          case 'f': result += '\f'; break;
          case 't': result += '\t'; break;
          case '\'': result += '\''; break;
          case '\"': result += '\"'; break;
          default: result += val.charAt(i+1); break;
        }
        i++ // + to skip
      }
      else {
        result += val.charAt(i);
      }
    }
    this.renderOutput(result)
  }

  /**
   * html escape
   */
  html_escape() {
    var val = this.state.value;
    this.renderOutput(escape(val))
  }

  /**
   * html unescape
   */
  html_unescape() {
    var val = this.state.value;
    this.renderOutput(unescape(val))
  }

  /**
   * json format
   */
  json_format() {
    var val = this.state.value;
    try {
      var jvalue = JSON.parse(val);
      this.renderOutput(JsonFormat(jvalue))
    }
    catch(err) {
      this.renderOutput("not a valid json : " + err)
    }
  }

  /**
   * json format
   */
  json_minify() {
    var val = this.state.value;
    try {
      var jvalue = JSON.parse(val);
      this.renderOutput(JSON.stringify(jvalue))
    }
    catch(err) {
      this.renderOutput("not a valid json : " + err)
    }
  }

  /**
   * json format
   */
  json_query() {
    var val = this.state.value;
    try {
      var jvalue = JSON.parse(val);
      var query = document.getElementById('json-query-string').value;
      var result = JsonQuery(query, { rootContext : jvalue })
      try{
        this.renderOutput(JsonFormat(result.value));
      }
      catch(err) {
        this.renderOutput(result.value);        
      }
    }
    catch(err) {
      this.renderOutput("not a valid json : " + err)
    }
  }

  clear_result() {
    this.renderOutput("")
  }

  copy_to_clipboard() {
    console.log(this.state.renderedValue)
    copy(this.state.renderedValue)
    alert("coppied to clipboard")
  }


  renderOutput(value) {
    this.state.renderedValue = value;
    ReactDOM.render(<AceEditor
      mode="javascript"
      theme="monokai"
      name="output-code"
      editorProps={{
        $blockScrolling: true,
      }}
      height="100%"
      width="100%"
      fontSize="20px"
      wrapEnabled="true"
      className="position-unset"
      value = {value}
      readOnly="true"
    />, document.getElementById('output-panel'));
  }

  constructor(props) {
    super(props);
    this.state = {
      value : "",
      renderedValue : ""
    }
    this.onEditor1Change = this.onEditor1Change.bind(this)
    this.renderOutput = this.renderOutput.bind(this)

    // operations
    this.sort_lines = this.sort_lines.bind(this)
    this.remove_duplicate = this.remove_duplicate.bind(this)
    this.comma_to_newline = this.comma_to_newline.bind(this)
    this.newline_to_comma = this.newline_to_comma.bind(this)
    this.remove_newline = this.remove_newline.bind(this)
    this.url_encode = this.url_encode.bind(this)
    this.url_decode = this.url_decode.bind(this)
    this.java_escape = this.java_escape.bind(this)
    this.java_unescape = this.java_unescape.bind(this)
    this.html_escape = this.html_escape.bind(this)
    this.html_unescape = this.html_unescape.bind(this)
    // json operations
    this.json_format = this.json_format.bind(this)
    this.json_minify = this.json_minify.bind(this)
    this.json_query = this.json_query.bind(this)
    this.clear_result = this.clear_result.bind(this)
    this.copy_to_clipboard = this.copy_to_clipboard.bind(this)
  }

  

  render() {
    return (
      <div className="App container-fluid full-width">
        <div className="row">
          {/* <div id="feature-panel" className="col-2">

          </div> */}
          <div className="col-12">
            <div className="row">
              <div id="source-panel" className="col-6">
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  onChange={this.onEditor1Change}
                  name="source-code"
                  editorProps={{$blockScrolling: true}}
                  height="100%"
                  width="100%"
                  fontSize="20px"
                  wrapEnabled="true"
                  className="position-unset"
                  value=""
                />
              </div>
              <div id="output-panel" className="col-6">
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  name="output-code"
                  editorProps={{
                    $blockScrolling: true,
                  }}
                  height="100%"
                  width="100%"
                  fontSize="20px"
                  wrapEnabled="true"
                  className="position-unset"
                  readOnly="true"
                  value="this panel is not editable"
                />
              </div>
            </div>
            <div className="row">
              <div id="operations-panel" className="col-12 text-left p-1"> 
                  <div className='input-group btn-group p-1' role="group">
                    <div className="input-group-prepend">
                      <span className="input-group-text zero-border-radius" id=""><strong>String</strong></span>
                    </div>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.sort_lines}><strong>Sort</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.java_escape}><strong>C# / Java Escape</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.java_unescape}><strong>C# / Java Unescape</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.url_encode}><strong>Url encode</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.url_decode}><strong>Url decode</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.html_escape}><strong>Html escape</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.html_unescape}><strong>Html unescape</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.newline_to_comma}><strong>Newline to comma</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.comma_to_newline}><strong>Comma to newline</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.remove_newline}><strong>Remove newline</strong></button>
                  </div>
                  <div className='input-group btn-group p-1' role="group">
                    <div className="input-group-prepend">
                      <span className="input-group-text zero-border-radius" id=""><strong>Json</strong></span>
                    </div>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.json_format}><strong>Format</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.json_minify}><strong>Minify</strong></button>
                    <div className="input-group-append">
                      <input id="json-query-string" type="text" className="zero-border-radius form-control" placeholder="Query goes here" aria-label="Query goes here" aria-describedby="basic-addon2"/>
                      <button className="btn btn-secondary zero-border-radius" onClick={this.json_query}><strong>Query Json</strong></button>
                    </div>
                  </div>
                  <div className='input-group btn-group p-1' role="group">
                    <div className="input-group-prepend">
                      <span className="input-group-text zero-border-radius" id=""><strong>Operations</strong></span>
                    </div>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.clear_result}><strong>Clear Result</strong></button>
                    <button className="btn btn-secondary zero-border-radius" onClick={this.copy_to_clipboard}><strong>Copy Result</strong></button>
                  </div>
              </div>

            </div>
        </div>
       </div>
      </div>
    );
  }
}

export default App;
