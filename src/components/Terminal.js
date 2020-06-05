import React, { Component } from "react"
import "./layout.css"
import { ReactTerminal } from "../../terminal-component/src"
import {
  WELCOME_MESSAGE,
  CONTACT_INFO,
  SUMMARY_MESSAGE,
} from "../constants/constants"
import resume from "../Resume.pdf"
import {
  EmulatorState,
  OutputFactory,
  FileSystem,
  Outputs,
  Emulator,
  defaultCommandMapping,
  CommandMapping,
} from "../../terminal/src"

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
        content: "this is a text file",
        canModify: false,
      },
      "/AboutMe/contact.txt": {
        content: OutputFactory.makeTextOutput(CONTACT_INFO),
        canModify: false,
      },
      "/AboutMe/summary.txt": {
        content: OutputFactory.makeTextOutput(SUMMARY_MESSAGE),
        canModify: false,
      },
      "/Projects/load-handler.git": {
        content: "",
        canModify: false,
      },
      "/Projects/tictactoe.git": {
        content: "",
        canModify: false,
      },
      "/Projects/hamiltonian-paths.git": {
        content: "",
        canModify: false,
      },
    })

    const customCommandMapping = CommandMapping.create({
      ...defaultCommandMapping,
      open: {
        function: (state, opts) => {
          return this.openCmd(opts[0])
        },
        optDef: {},
      },
    })

    this.state = {
      emulator: new Emulator(),
      emulatorState: EmulatorState.create({
        fs: customFileSystem,
        outputs: customOutputs,
        commandMapping: customCommandMapping,
      }),
      inputStr: "",
      promptSymbol: "wesley:~",
      isRoot: true,
      promptPath: "",
      showTerminal: false,
    }
  }

  // ugly ass code thats impossible to clean up
  openCmd(opts) {
    switch (opts) {
      case "Resume.pdf":
        if (this.state.promptPath.includes("/AboutMe")) window.open(resume)
        else
          return {
            output: OutputFactory.makeTextOutput("No such file"),
          }
        break
      case "load-handler.git":
        if (this.state.promptPath.includes("/Projects"))
          window.open("https://github.com/wes1498/Load-Handler")
        else
          return {
            output: OutputFactory.makeTextOutput("No such file"),
          }
        break
      case "tictactoe.git":
        if (this.state.promptPath.includes("/Projects"))
          window.open("https://github.com/wes1498/TicTacToe")
        else
          return {
            output: OutputFactory.makeTextOutput("No such file"),
          }
        break
      case "hamiltonian-paths.git":
        if (this.state.promptPath.includes("/Projects"))
          window.open("https://github.com/wes1498/Hamiltonion-Path")
        else
          return {
            output: OutputFactory.makeTextOutput("No such file"),
          }
        break
      default:
        return {
          output: OutputFactory.makeTextOutput("No such file"),
        }
    }
    return {
      output: OutputFactory.makeTextOutput(""),
    }
  }

  _onStateChange = (emulatorState, commandStr) => {
    if (this.isDirectoryChange(commandStr)) {
      this.onDirectoryChange(commandStr)
    }
    this.setState(prevState => {
      return {
        ...prevState,
        emulatorState,
        inputStr: ""
      }
    })
  }

  isDirectoryChange(commandStr) {
    var str = commandStr.split(" ")
    if (str[0] === "cd") {
      return true
    }
    return false
  }

  onDirectoryChange(commandStr) {
    var str = commandStr.split(" ")
    var path = str[1]
    if (path === "") {
      return
    }
    switch (path) {
      case ".":
        console.log("doesnt change command prompt. (current directory)")
        break
      case "..":
        if (this.state.promptPath === "") {
          console.log("doesnt change prompt symbol, at root directory")
        } else {
          path = this.state.promptPath.split("/")
          path.pop()
          path.join("/")
          console.log(path)
          this.setState({ promptPath: path })
        }
        break
      default:
        // check if path exists
        if (!path.includes("AboutMe") && !path.includes("Projects")) {
          this.setState(state => ({
            promptPath: state.promptPath,
          }))
          return
        }
        if (path.charAt(path.length - 1) === "/") {
          path = path.splice(0, path.length - 1)
        }
        if (path.charAt(0) === "/") {
          path = path.splice(1)
        }
        this.setState(state => ({
          promptPath: state.promptPath + "/" + path,
        }))
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
          onStateChange={this._onStateChange}
        />
      </div>
    )
  }
}

export default Terminal
