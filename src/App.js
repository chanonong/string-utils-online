import React, { Component } from 'react';
import logo from './logo.svg';
import brace from 'brace';
import AceEditor from 'react-ace';
import ReactDOM from 'react-dom';


import 'brace/mode/java';
import 'brace/theme/monokai';
import './App.css';

class App extends Component {

  onEditor1Change(i) {
    this.state.value = i
    console.log('editor 1 change', i);
  }

  echo() {
    console.log("=> echo")
    var val = this.state.value
    this.renderOutput(val)
  }

  sort() {
    console.log("=> sort")
    var val = this.state.value
    this.renderOutput(val.split(/\r?\n/).sort().join("\n"))
  }

  set() {
    var set = {};
    var val = this.state.value    
    var distinct = Array.from(new Set(val.split(/\r?\n/)))
    this.renderOutput(distinct.sort().join("\n"))

  }

  renderOutput(value) {
    console.log("Render Output")
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
      value : ""
    }
    console.log(this.state)
    this.onEditor1Change = this.onEditor1Change.bind(this)
    this.renderOutput = this.renderOutput.bind(this)

    // operations
    this.echo = this.echo.bind(this)
    this.sort = this.sort.bind(this)
    this.set = this.set.bind(this)
  }

  

  render() {
    return (
      <div className="App container-fluid full-width">
        <div className="row">
          <div id="feature-panel" className="col-2">

          </div>
          <div className="col-10">
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
                />
              </div>
            </div>
            <div className="row">
              <div id="operations-panel" className="col-12"> 
                  <div className='btn-group' role="group">
                    <button className="btn" onClick={this.echo}>Echo</button>
                    <button className="btn" onClick={this.sort}>Sort</button>
                    <button className="btn" onClick={this.set}>Remove Duplicate</button>
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
