import React, { Component } from "react"
import "./layout.css"
import { ReactTerminal } from "../../terminal-component/src"
import {
  EmulatorState,
  OutputFactory,
  FileSystem,
  Outputs,
  Emulator,
} from "../../terminal/src"

const welcomeMessage = (
  <div>
    <b style={{ color: "aqua" }}>Hello, My name is Wesley Sequeira!</b>
    <p>Enjoy your stay.</p>
    Press ` to minimize the terminal. Available commands are:
    <p>
      <span style={{ color: "red" }}>cd</span>,{" "}
      <span style={{ color: "red" }}>ls</span>,{" "}
      <span style={{ color: "red" }}>cat</span>,{" "}
      <span style={{ color: "red" }}>open</span> (opens file like pdf and jpg)
    </p>
  </div>
)
const contact = (
  <div>
    <br/>
    <p><span style={{ color: "lightgrey" }}>Email: </span> wesley.sequeira@hotmail.com<br/><br/>
      <span style={{ color: "lightgrey" }}>Linkedin: </span><a class="link" href="https://www.linkedin.com/in/wesleysequeira/">https://www.linkedin.com/in/wesleysequeira/</a><br/><br/>
      <span style={{ color: "lightgrey" }}>Github: </span> <a class="link" href="https://github.com/wes1498">https://github.com/wes1498</a>
    </p>
  </div>
)

class Terminal extends Component {
  constructor() {
    super()
    const textOutput = OutputFactory.makeTextOutput(welcomeMessage)
    const customOutputs = Outputs.create([textOutput])
    const customFileSystem = FileSystem.create({
      "/AboutMe": {},
      "/Projects": {},
      "/welcome.txt": {
        content: textOutput,
        canModify: false,
      },
      "/AboutMe/Resume.pdf": {
        content: "This is a text file",
        canModify: false,
      },
      "/AboutMe/contact.txt": {
        content: "This is a text file",
        canModify: false,
      },
      "/AboutMe/summary.txt": {
        content: OutputFactory.makeTextOutput(contact),
        canModify: false,
      },
      "/Projects/load-handler.git": {
        content: "This is a text file",
        canModify: false,
      },
      "/Projects/tictactoe.git": {
        content: "This is a text file",
        canModify: false,
      },
      "/Projects/hamiltonian-paths.git": {
        content: "This is a text file",
        canModify: false,
      }
    })

    this.state = {
      emulator: new Emulator(),
      emulatorState: EmulatorState.create({
        fs: customFileSystem,
        outputs: customOutputs,
      }),
      inputStr: "",
      promptSymbol: "wesley:~",
      isRoot: true,
      promptPath: "",
      showTerminal: false,
    }
  }

  render() {
    return (
      <div id="___terminal">
        <ReactTerminal
          emulatorState={this.state.emulatorState}
          inputStr={this.state.inputStr}
          promptSymbol={this.state.promptSymbol}
          promptPath={this.state.promptPath}
          theme={{
            background: "#141313",
            promptSymbolColor: "lightgreen",
            commandColor: "lightgrey",
            outputColor: "lightgrey",
            errorOutputColor: "#ff89bd",
            fontSize: "0.8rem",
            spacing: "1%",
            fontFamily: "monospace",
            width: "100%",
            height: "50vh",
          }}
          onStateChange={emulatorState => this.setState({ emulatorState })}
        />
      </div>
    )
  }
}

export default Terminal
