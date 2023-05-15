
import React, { useEffect } from 'react'
import './App.css'

function App() {
  const STARTING_TIME = 60

  const [content, setContent] = React.useState("")
  const [timeRemaining,  setTimeRemaining] = React.useState(STARTING_TIME)
  const [start, setStart] = React.useState(false)
  const [wordCount, setWordCount ] = React.useState(0)
  const inputRef = React.useRef(null)



  useEffect(()=>{
    if(start && timeRemaining>0){
      setTimeout(()=>{
        setTimeRemaining(prevTime=> prevTime -1)
      },1000)
    }else if(timeRemaining === 0){
      endGame()
    }
  },[timeRemaining,start])

  function handleChange(event){
    const {value} = event.target
    setContent(prevContent=> value)
  }
  function calculateWordsCount(){
    const wordsArray = content.split(' ').filter(element=>{
      return element != ""
    })
    return wordsArray.length
  }

  function startGame(){
    setStart(true) 
    setWordCount(0)
    setContent(prevContent=>'')
    setTimeRemaining(STARTING_TIME)
    inputRef.current.disabled= false
    inputRef.current.focus()
  }

  function endGame(){
    setWordCount(prevCount=> calculateWordsCount())
    setStart(false)
  }

  return (
    <main>
      <div className='game-wrapper'>
        <h1>How Fast Can You Type ?</h1>
        <textarea
          disabled={!start}
          value={content}
          onChange={handleChange}
          name='content'
          ref={inputRef}
        />
        <h1>Time Remaining : {timeRemaining}</h1>
        <button onClick={startGame} disabled={start}>Start</button>
        <h1 style={{marginTop:'10px'}}>Word Count  : {wordCount}</h1>
      </div>
    </main>
  )
}

export default App
