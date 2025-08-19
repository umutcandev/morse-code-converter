"use client"

import { motion } from "framer-motion"
import { Settings, Volume2, Gauge, Monitor, Sun, Moon, Palette } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAudio } from "@/contexts/AudioContext"
import { useTheme } from "next-themes"

export function Header() {
  const { settings, updateFrequency, updateSpeed } = useAudio()
  const { theme, setTheme } = useTheme()
  return (
    <motion.header 
      className="w-full bg-zinc-950 border-b border-zinc-800"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto max-w-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Sol taraf - Title ve GitHub Badge */}
          <div className="flex items-center gap-3">
            <motion.h1 
              className="text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Mors Çevirici
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Badge 
                variant="outline" 
                asChild
                className="cursor-pointer hover:bg-zinc-800 transition-colors duration-200 border-zinc-700 text-zinc-300 hover:text-white"
              >
                <Link 
                  href="https://github.com/umutcandev/morse-code-converter" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <svg 
                    className="h-3 w-3" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
                  </svg>
                  <span>umutcandev</span>
                </Link>
              </Badge>
            </motion.div>
          </div>

          {/* Sağ taraf - Ayarlar Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-zinc-300 hover:text-white hover:bg-zinc-700 bg-zinc-800/50 border border-zinc-700/50 transition-all duration-200 hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-800/20"
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Ayarlar menüsünü aç</span>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                align="end" 
                className="w-64 bg-zinc-900 border-zinc-800 p-3"
              >
                
                {/* Ton Ayarı */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-zinc-400" />
                    <Label className="text-sm text-zinc-300">
                      Ton Frekansı
                    </Label>
                  </div>
                  <Select 
                    value={settings.frequency.toString()} 
                    onValueChange={(value) => updateFrequency(parseInt(value))}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-300 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="300" className="text-zinc-300 hover:bg-zinc-700">300 Hz (Çok Alçak)</SelectItem>
                      <SelectItem value="400" className="text-zinc-300 hover:bg-zinc-700">400 Hz (Alçak)</SelectItem>
                      <SelectItem value="500" className="text-zinc-300 hover:bg-zinc-700">500 Hz (Orta-Alçak)</SelectItem>
                      <SelectItem value="600" className="text-zinc-300 hover:bg-zinc-700">600 Hz (Standart)</SelectItem>
                      <SelectItem value="700" className="text-zinc-300 hover:bg-zinc-700">700 Hz (Orta-Yüksek)</SelectItem>
                      <SelectItem value="800" className="text-zinc-300 hover:bg-zinc-700">800 Hz (Yüksek)</SelectItem>
                      <SelectItem value="900" className="text-zinc-300 hover:bg-zinc-700">900 Hz (Çok Yüksek)</SelectItem>
                      <SelectItem value="1000" className="text-zinc-300 hover:bg-zinc-700">1000 Hz (Çok Yüksek)</SelectItem>
                      <SelectItem value="1200" className="text-zinc-300 hover:bg-zinc-700">1200 Hz (Ultra Yüksek)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Hız Ayarı */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-zinc-400" />
                    <Label className="text-sm text-zinc-300">
                      Ses Hızı
                    </Label>
                  </div>
                  <Select 
                    value={settings.speed.toString()} 
                    onValueChange={(value) => updateSpeed(parseFloat(value))}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-300 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="0.25" className="text-zinc-300 hover:bg-zinc-700">0.25x (Çok Yavaş)</SelectItem>
                      <SelectItem value="0.5" className="text-zinc-300 hover:bg-zinc-700">0.50x (Yavaş)</SelectItem>
                      <SelectItem value="0.75" className="text-zinc-300 hover:bg-zinc-700">0.75x (Orta Yavaş)</SelectItem>
                      <SelectItem value="1" className="text-zinc-300 hover:bg-zinc-700">1x (Normal)</SelectItem>
                      <SelectItem value="1.25" className="text-zinc-300 hover:bg-zinc-700">1.25x (Hızlı)</SelectItem>
                      <SelectItem value="1.5" className="text-zinc-300 hover:bg-zinc-700">1.50x (Çok Hızlı)</SelectItem>
                      <SelectItem value="2" className="text-zinc-300 hover:bg-zinc-700">2x (Ultra Hızlı)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DropdownMenuSeparator className="bg-zinc-800 my-3" />

                {/* Tema Ayarı */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-zinc-400" />
                    <Label className="text-sm text-zinc-300">
                      Tema  
                    </Label>

                  </div>
                  <Select 
                    value={theme || 'system'} 
                    onValueChange={setTheme}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-300 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="system" className="text-zinc-300 hover:bg-zinc-700">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          <span>Sistem</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="light" className="text-zinc-300 hover:bg-zinc-700">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          <span>Açık Tema</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark" className="text-zinc-300 hover:bg-zinc-700">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          <span>Koyu Tema</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
