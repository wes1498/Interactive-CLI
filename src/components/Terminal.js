import React, { Component } from "react"
import { ReactTerminal } from "react-terminal-component"
import ReactDOMServer from 'react-dom/server'
import {
  EmulatorState,
  OutputFactory,
  CommandMapping,
  EnvironmentVariables,
  FileSystem,
  History,
  Outputs,
  defaultCommandMapping,
  Emulator,
} from "javascript-terminal"

const welcomeMessage = <div>
<b style={{color: "aqua"}}>Hello, My name is Wesley Sequeira!</b>
<p>Enjoy your stay.</p>
Press ` to minimize the terminal. Available commands are:
<p>
  <span style={{color: "red"}}>cd</span>, <span style={{color: "red"}}>ls</span>, <span style={{color: "red"}}>cat</span>, <span style={{color: "red"}}>open</span> (opens file like pdf and jpg)
</p>
</div>
const welcomeMessage2 =<div
dangerouslySetInnerHTML={{
  __html: <div>
  <b style={{color: "aqua"}}>Hello, My name is Wesley Sequeira!</b>
  <p>Enjoy your stay.</p>
  Press ` to minimize the terminal. Available commands are:
  <p>
    <span style={{color: "red"}}>cd</span>, <span style={{color: "red"}}>ls</span>, <span style={{color: "red"}}>cat</span>, <span style={{color: "red"}}>open</span> (opens file like pdf and jpg)
  </p>
  </div>
}}></div>

class Terminal extends Component {
  constructor() {
    super()
    
    const textOutput = OutputFactory.makeTextOutput(
      welcomeMessage
    )
    const customOutputs = Outputs.create([textOutput])

    const customFileSystem = FileSystem.create({
      "/AboutMe": {},
      "/Projects": {},
      "/welcome.txt": { content: ReactDOMServer.renderToStaticMarkup(welcomeMessage2), canModify: false },
      "/AboutMe/Resume.pdf": {
        content: "This is a text file",
        canModify: false,
      },
      "/AboutMe/contact.txt": {
        content: "This is a text file",
        canModify: false,
      },
      "/AboutMe/summary.txt": {
        content: "This is a text file",
        canModify: false,
      },
      "/home/nested/directory/file": { content: "End of nested directory!" },
    })

    this.state = {
      emulator: new Emulator(),
      emulatorState: EmulatorState.create({
        fs: customFileSystem,
        outputs: customOutputs,
      }),
      inputStr: "",
      promptSymbol: "wesley:/~ ",
      currentDir: "",
    }
  }

  render() {
    return (
      <div id='___terminal'>
        <ReactTerminal
          emulatorState={this.state.emulatorState}
          inputStr={this.state.inputStr}
          promptSymbol={this.state.promptSymbol + this.state.currentDir}
          theme={{
            background: "#141313",
            promptSymbolColor: "#6effe6",
            commandColor: "#fcfcfc",
            outputColor: "#fcfcfc",
            errorOutputColor: "#ff89bd",
            fontSize: "0.8rem",
            spacing: "1%",
            fontFamily: "monospace",
            width: "100%",
            height: "50vh",
          }}
          onInputChange={inputStr => this.setState({ inputStr })}
          onStateChange={emulatorState => this.setState({ emulatorState })}
        />
      </div>
    )
  }
}

export default Terminal
