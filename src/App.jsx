import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThreadSearchComponent } from './Threads'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ThreadSearchComponent />
    </div>
  )
}

export default App
