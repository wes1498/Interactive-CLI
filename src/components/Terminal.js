import React, { Component } from "react"
import { ReactTerminal } from "../../terminal-component/src"
import ReactDOMServer from "react-dom/server"
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

class Terminal extends Component {
  constructor() {
    super()

    const textOutput = OutputFactory.makeTextOutput(welcomeMessage)
    const customOutputs = Outputs.create([textOutput])
    const textOutputContent = textOutput.content

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
        content: "This is a text file",
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
      },
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
          onStateChange={emulatorState => this.setState({ emulatorState })}
        />
      </div>
    )
  }
}

export default Terminal
