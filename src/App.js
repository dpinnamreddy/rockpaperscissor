import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import 'reactjs-popup/dist/index.css'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    userChoice: '',
    randomChoice: '',
    isWon: false,
    isDraw: false,
    score: 0,
  }

  makePlay = e => {
    const userSelection = e.target.id
    const randomNumber = Math.floor(Math.random() * 3)
    const randomDraw = choicesList[randomNumber].id
    const winningCases =
      (userSelection === 'ROCK' && randomDraw === 'SCISSORS') ||
      (userSelection === 'SCISSORS' && randomDraw === 'PAPER') ||
      (userSelection === 'PAPER' && randomDraw === 'ROCK')
    if (randomDraw === userSelection) {
      this.setState({
        userChoice: userSelection,
        randomChoice: randomDraw,
        isDraw: true,
      })
    } else if (winningCases) {
      this.setState(prevState => ({
        userChoice: userSelection,
        randomChoice: randomDraw,
        isWon: true,
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        userChoice: userSelection,
        randomChoice: randomDraw,
        isWon: false,
        score: prevState.score - 1,
      }))
    }
  }

  softReset = () => {
    this.setState({
      userChoice: '',
      randomChoice: '',
      isWon: false,
      isDraw: false,
    })
  }

  render() {
    const {userChoice, randomChoice, isWon, isDraw, score} = this.state
    let userSelection = null
    let randomSelection = null

    if (userChoice !== '') {
      userSelection = choicesList.filter(choice => choice.id === userChoice)[0]
        .imageUrl

      randomSelection = choicesList.filter(
        choice => choice.id === randomChoice,
      )[0].imageUrl
    }

    return (
      <div className="container">
        <div className="header">
          <div>
            <h1>ROCK PAPER SCISSORS</h1>
          </div>
          <div className="sub-card">
            <p>Score</p>
            <p>{score}</p>
          </div>
        </div>
        {userChoice === '' ? (
          <div className="game">
            {choicesList.map(choice => {
              const buttonName = choice.id.toLowerCase().concat('Button')
              console.log(buttonName)
              return (
                <button
                  type="button"
                  className="button-icon"
                  onClick={this.makePlay}
                  key={choice.id}
                  data-testid={buttonName}
                >
                  <img
                    src={choice.imageUrl}
                    alt={choice.id}
                    className="icon"
                    id={choice.id}
                  />
                </button>
              )
            })}
          </div>
        ) : (
          <div className="results-card">
            <div className="choice-card">
              <div className="card">
                <h1>YOU</h1>
                <img src={userSelection} alt="your choice" className="icon" />
              </div>
              <div className="card">
                <h1>OPPONENT</h1>
                <img
                  src={randomSelection}
                  alt="opponent choice"
                  className="icon"
                />
              </div>
            </div>
            {isDraw ? (
              <p>IT IS DRAW</p>
            ) : (
              <>{isWon ? <p>YOU WON</p> : <p>YOU LOSE</p>}</>
            )}
            <button type="button" onClick={this.softReset}>
              PLAY AGAIN
            </button>
          </div>
        )}
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Rules
            </button>
          }
        >
          {close => (
            <div className="popup">
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
