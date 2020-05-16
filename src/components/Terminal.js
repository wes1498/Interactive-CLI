import React, { Component } from "react"
import "./layout.css"
import { ReactTerminal } from "../../terminal-component/src"
import {WELCOME_MESSAGE,CONTACT_INFO} from "../constants/constants"
import resume from "../documents/Resume.pdf"
import {
  EmulatorState,
  OutputFactory,
  FileSystem,
  Outputs,
  Emulator,
  defaultCommandMapping,
  CommandMapping
} from "../../terminal/src"
import {makeError, fsErrorType} from '../../terminal/src/fs/fs-error'



class Terminal extends Component {
  constructor() {
    super()
    const textOutput = OutputFactory.makeTextOutput(WELCOME_MESSAGE)
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
        content: OutputFactory.makeTextOutput(CONTACT_INFO),
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

    const customCommandMapping = CommandMapping.create({
      ...defaultCommandMapping,
      'open': {
        'function': (state, opts) => {
          console.log(state)
          switch(opts[0]){
            case 'Resume.pdf':
              window.open(resume);
              break;
            case 'load-handler.git':
              window.open('https://github.com/wes1498/Load-Handler');
              break;
            case 'tictactoe.git':
              window.open('https://github.com/wes1498/TicTacToe');
              break;
            case 'hamiltonian-paths.git':
              window.open('https://github.com/wes1498/Hamiltonion-Path');
              break;
            default:
              console.log('Theres a print lag')
              return {
                output: OutputFactory.makeTextOutput("No such file")
              };
          }
        },
        'optDef': {}
      }
    })

    this.state = {
      emulator: new Emulator(),
      emulatorState: EmulatorState.create({
        fs: customFileSystem,
        outputs: customOutputs,
        commandMapping: customCommandMapping
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
