import { useState, useCallback, useEffect, useRef } from 'react'




function App() {
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)

  const [charallowed, setcharalowed] = useState(false)
  const [Password, setPassword] = useState("")

  const [rangespd, setrangespd] = useState(5)
  //use ref hook
  const passwordref = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*()_-+={}[]"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberallowed, charallowed, setPassword])

  const copyPasswordtoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordgenerator()
  }, [length, numberallowed, charallowed, passwordgenerator])





  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center py-5'>Password Generator</h1>

        <div className='flex sahdow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-3 px-3'
            placeholder='password'
            readOnly
          />

          <button
            onClick={copyPasswordtoclipboard}
            className='outline-none bg-blue-700  text-orange-500 px-4 py-3 shrink-0'>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />

            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberallowed}
              id='numberinput'
              onChange={() => {
                setnumberallowed((prev) => !prev);
              }} />
            <label >numbers{ }</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charallowed}
              id='characterinput'
              onChange={() => {
                setcharalowed((prev) => !prev);
              }} />
            <label htmlFor="cahracterinput">Characters</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
