import  { useState } from 'react'

const App = () => {
  const [commands] = useState(true)
  const [texts, setTexts] = useState("")
  const [response, setResponse] = useState("")
  const [islistening, setIslistening] = useState(false)


  const speak = (abc, callback) => {
    const uttterance = new SpeechSynthesisUtterance(abc)
    window.speechSynthesis.speak(uttterance)

    uttterance.onend = ()=>{
      if(callback) callback()
    }
  }


  const handleCommands = (command) => {
    if (command.includes("open whatsapp")) {
      const message = "Opening Whatsapp"
      setResponse(message)
      window.open("https://www.whatsapp.com", "_blank")
    }
    if (command.includes("open facebook")) {
      const message = "Opening Facebook"
      speak(message)
      setResponse(message)
      window.open("https://www.facebook.com", "_blank")
    }
    if (command.includes("open instagram")) {
      const message = "Opening instagram"
      speak(message)
      setResponse(message)
      window.open("https://www.instagram.com", "_blank")
    }
    if (command.includes("open youtube")) {
      const message = "Opening youtube"
      speak(message)
      setResponse(message)
      window.open("https://www.youtube.com", "_blank")
    }
    else {
      const message = `Searching Google for.... ${command}`
      speak(message)
      setResponse(message)
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`)
    }
  }

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const message = "Speech Recognition doesnot support on this browser"
      setResponse(message)
      alert(message)
      return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)

    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      // console.log(event)
      const text = event.results[0][0].transcript.toLowerCase()
      // console.log(text)
      setTexts(text)
      handleCommands(text)

      setTimeout(() => {
        setIslistening(false)
      })


    }

    setIslistening(true)

    recognition.start()
  }
  const handleClick = ()=>{
    speak("Listening.... Please give me a command",() => { startListening()})
    
  }

  return (

    <div className="w-screen h-screen bgimg flex items-center flex-col gap-8 p-4 sm:p-6 md:p-8 justify-center">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-600 text-center mb-6">
    Voice Assistance Using ReactJS
  </h1>
  <p className="text-sm sm:text-md md:text-lg font-semibold text-black text-center">
    {commands ? "Please give me a command" : "Processing Your Commands"}
  </p>

  <div className="flex items-center justify-center mt-4">
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-black rounded-lg text-white font-medium hover:bg-gray-800 hover:scale-105 hover:shadow-xl transition-transform duration-300"
    >
      {islistening ? "Listening..." : "Start Listening"}
    </button>
  </div>

  <div className="bg-white p-5 shadow-lg h-auto rounded-xl space-y-5 w-full max-w-md sm:max-w-lg md:max-w-xl mt-6">
    <h2 className="text-lg sm:text-xl md:text-2xl">
      <span className="text-green-600 font-bold">Recognition Speech:</span>
      <br />
      {texts}
    </h2>
    <h4 className="text-lg sm:text-xl md:text-2xl">
      <span className="text-orange-700 font-bold">Response:</span>
      <br />
      {response}
    </h4>
  </div>
</div>

  )
}

export default App
