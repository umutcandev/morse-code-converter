"use client"

import { useState, useRef } from "react"
import { useAudio } from "@/contexts/AudioContext"
import { motion, AnimatePresence } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Play, Pause, Copy, Check, ArrowUpDown, Send } from "lucide-react"
import { Header } from "@/components/header"

const morseCodeMap: { [key: string]: string } = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
}

// Create reverse mapping for morse to text conversion
const reverseMorseMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
)

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const buttonVariants = {
  idle: { opacity: 1 },
  hover: { opacity: 0.8, transition: { duration: 0.2 } },
  tap: { opacity: 0.6, transition: { duration: 0.1 } }
}

const highlightVariants = {
  initial: { backgroundColor: "transparent" },
  highlighted: { backgroundColor: "#facc15", color: "#000000" }
}

export default function MorseCodeConverter() {
  const { settings } = useAudio()
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isTextToMorse, setIsTextToMorse] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isCopied, setIsCopied] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const isStoppedRef = useRef(false)

  const convertText = () => {
    if (!inputText.trim()) {
      setOutputText("")
      return
    }

    if (isTextToMorse) {
      // Text to Morse conversion
      const converted = inputText
        .toUpperCase()
        .split("")
        .map((char) => morseCodeMap[char] || "")
        .filter((morse) => morse !== "")
        .join(" ")
      setOutputText(converted)
    } else {
      // Morse to Text conversion
      const morseWords = inputText.split(" / ")
      const converted = morseWords
        .map((word) => {
          return word
            .trim()
            .split(" ")
            .filter((morse) => morse.trim() !== "")
            .map((morse) => reverseMorseMap[morse.trim()] || "")
            .join("")
        })
        .join(" ")
      setOutputText(converted)
    }
  }

  const toggleConversionMode = () => {
    setIsTextToMorse(!isTextToMorse)
    setInputText(outputText)
    setOutputText(inputText)
  }

  const createTone = (frequency: number, duration: number, audioContext: AudioContext) => {
    return new Promise<void>((resolve) => {
      if (isStoppedRef.current) {
        resolve()
        return
      }

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.005)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + duration - 0.005)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)

      setTimeout(() => resolve(), duration * 1000)
    })
  }

  const delay = (ms: number) => {
    return new Promise((resolve) => {
      if (isStoppedRef.current) {
        resolve(undefined)
        return
      }
      setTimeout(resolve, ms)
    })
  }

  const playMorseCode = async () => {
    const textToPlay = isTextToMorse ? inputText : outputText
    if (!textToPlay || isPlaying) return

    setIsPlaying(true)
    setHighlightedIndex(-1)
    isStoppedRef.current = false

    try {
      // 300ms başlangıç gecikmesi
      await delay(300)
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // AudioContext'in tam olarak hazır olması için ek bir küçük gecikme
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      await delay(100)

      const textArray = textToPlay.toUpperCase().split("")

      for (let i = 0; i < textArray.length; i++) {
        if (isStoppedRef.current) break

        const char = textArray[i]
        setHighlightedIndex(i)

        const morse = morseCodeMap[char]
        if (morse) {
          for (const symbol of morse) {
            if (isStoppedRef.current) break

            if (symbol === ".") {
              await createTone(settings.frequency, 0.1 / settings.speed, audioContextRef.current)
              await delay(50 / settings.speed)
            } else if (symbol === "-") {
              await createTone(settings.frequency, 0.3 / settings.speed, audioContextRef.current)
              await delay(50 / settings.speed)
            }
          }
          await delay(150 / settings.speed)
        } else if (char === " ") {
          await delay(350 / settings.speed)
        }
      }

      if (audioContextRef.current) {
        await audioContextRef.current.close()
        audioContextRef.current = null
      }
    } catch (error) {
      console.error("Audio playback error:", error)
    } finally {
      setIsPlaying(false)
      setHighlightedIndex(-1)
      isStoppedRef.current = false
    }
  }

  const stopPlaying = () => {
    isStoppedRef.current = true
    setIsPlaying(false)
    setHighlightedIndex(-1)

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
  }

  const copyToClipboard = async () => {
    if (!outputText) return

    try {
      await navigator.clipboard.writeText(outputText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <motion.div 
        className="container mx-auto max-w-2xl px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-left space-y-1 mb-8"
          variants={itemVariants}
        >
          <motion.p 
            className="text-muted-foreground text-base"
            variants={itemVariants}
          >
            Metin ve Mors kodu arasında hızlı çeviri yapın. Sesli oynatma ile Mors kodunu öğrenin.
          </motion.p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          variants={containerVariants}
        >
          {/* Input Text Area */}
          <motion.div 
            className="space-y-3"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="input-text" className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {isTextToMorse ? "Metin" : "Mors Kodu"}
              </Label>
            </motion.div>
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <Textarea
                id="input-text"
                placeholder={isTextToMorse ? "Örneğin: merhaba dünya" : "Örneğin: -- . .-. .... .- -... .- / -.. ..- -. -.-- .-"}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] text-base resize-none bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-ring pr-12 transition-all duration-300"
              />

              <motion.div
                variants={buttonVariants}
                initial="idle"
                className="absolute bottom-3 right-3"
              >
                <Button
                  onClick={convertText}
                  disabled={!inputText.trim()}
                  size="sm"
                  className="h-8 w-8 rounded-full p-0 flex-shrink-0 transition-all duration-200 bg-white hover:bg-gray-100 text-black border disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                    <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Highlighting display for input text during playback */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border border-border rounded-lg p-3 bg-card text-base leading-relaxed"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-muted-foreground mb-2 uppercase tracking-wide"
                  >
                    Oynatılıyor:
                  </motion.div>
                  <div className="font-geist-mono break-words overflow-hidden">
                    {(isTextToMorse ? inputText : outputText).split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={highlightVariants}
                        initial="initial"
                        animate={highlightedIndex === index ? "highlighted" : "initial"}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`inline-block px-0.5 rounded ${
                          highlightedIndex === index ? "" : "text-muted-foreground"
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Separator with Toggle */}
          <motion.div 
            className="relative flex items-center justify-center py-4"
            variants={itemVariants}
          >
            <div className="w-full">
              <Separator className="bg-border" />
            </div>
            <div className="absolute">
              <Button
                onClick={toggleConversionMode}
                variant="outline"
                size="sm"
                className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 transition-all duration-300"
              >
                <span className="flex items-center">
                  <span>
                    {isTextToMorse ? "Metin" : "Mors"}
                  </span>
                  <motion.div
                    animate={{ rotate: !isTextToMorse ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <ArrowUpDown className="h-4 w-4 mx-2" />
                  </motion.div>
                  <span>
                    {isTextToMorse ? "Mors" : "Metin"}
                  </span>
                </span>
              </Button>
            </div>
          </motion.div>

          {/* Output Text Area */}
          <motion.div 
            className="space-y-3"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="output-text" className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {isTextToMorse ? "Mors Kodu" : "Metin"}
              </Label>
            </motion.div>
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div
                animate={outputText ? { opacity: 1 } : { opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  id="output-text"
                  placeholder={isTextToMorse ? "Mors kodu çıktısı buraya gelecek..." : "Çevrilmiş metin buraya gelecek..."}
                  value={outputText}
                  readOnly
                  className="min-h-[120px] text-base resize-none bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-ring pr-12 transition-all duration-300"
                />
              </motion.div>
              <div className="absolute top-3 right-3 flex space-x-2">
                <motion.div
                  variants={buttonVariants}
                  initial="idle"
                >
                  <Button
                    onClick={isPlaying ? stopPlaying : playMorseCode}
                    disabled={!outputText.trim()}
                    size="sm"
                    className={`h-8 w-8 rounded-full p-0 flex-shrink-0 transition-all duration-200 ${
                      isPlaying
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-border"
                    } ${!outputText.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <motion.div
                      animate={isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
                      transition={{ 
                        repeat: isPlaying ? Infinity : 0, 
                        duration: 1,
                        ease: "easeInOut"
                      }}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                    </motion.div>
                  </Button>
                </motion.div>
                <AnimatePresence>
                  {outputText && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        variants={buttonVariants}
                        initial="idle"
                      >
                        <Button
                          onClick={copyToClipboard}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                        >
                          <motion.div
                            animate={isCopied ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
