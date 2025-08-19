"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AudioSettings {
  frequency: number // Ton ayarı (Hz)
  speed: number     // Hız çarpanı
}

interface AudioContextType {
  settings: AudioSettings
  updateFrequency: (frequency: number) => void
  updateSpeed: (speed: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

// Varsayılan değerler
const DEFAULT_SETTINGS: AudioSettings = {
  frequency: 600, // Varsayılan frekans (CW standart - 600Hz ideal)
  speed: 0.75     // Varsayılan hız (yeni başlayanlar için yavaş tempo)
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS)

  // localStorage'dan ayarları yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSettings = localStorage.getItem('morseAudioSettings')
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings)
          setSettings(parsed)
        }
      } catch (error) {
        console.error('Ayarlar yüklenirken hata:', error)
      }
    }
  }, [])

  // Ayarları localStorage'a kaydet
  const saveSettings = (newSettings: AudioSettings) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('morseAudioSettings', JSON.stringify(newSettings))
      } catch (error) {
        console.error('Ayarlar kaydedilirken hata:', error)
      }
    }
  }

  const updateFrequency = (frequency: number) => {
    const newSettings = { ...settings, frequency }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const updateSpeed = (speed: number) => {
    const newSettings = { ...settings, speed }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  return (
    <AudioContext.Provider value={{ settings, updateFrequency, updateSpeed }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
