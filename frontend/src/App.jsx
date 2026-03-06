  import { useState } from 'react'

  function Display({name}){
    return (
      <>
        <h1>Hello {name}, how are you doing</h1>
      </>
    )
  }

  function App() {
    const [name, setName] = useState("")
    const [show, setShow] = useState(false)
    const [previousName, setPreviousName] = useState("");
    const ClearScreen = () => {
      setPreviousName(name)
      setName("")
      setShow(true)
    }
    return (
      <>
        <label htmlFor="name">
          <input type="text" value={name} placeholder='Enter Your name' onChange={(e)=> setName(e.target.value)}/>
        </label>
        <button onClick={ClearScreen}>Submit</button>
      {show && <Display name={previousName} />}
      </>
    )
  }

  export default App
