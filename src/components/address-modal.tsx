"use client"

import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { AddressSuggestion } from '@/types'
import { useDebouncedCallback } from 'use-debounce';
import { AlertCircle, LoaderCircle, MapPin } from 'lucide-react';
import { selectSuggestionAction } from '@/app/(private)/actions/addressActions';

const AddressModal = () => {
  const [inputText, setInputText] = useState("")
  const [sessionToken, setSessionToken] = useState(uuidv4())
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchSuggestions = useDebouncedCallback(async (input) => {
      if(!input.trim()) {
        setSuggestions([])
        return
      }
      console.log("input",input)
      try {
        const response = await fetch(
          `/api/address/autocomplete?input=${input}&sessionToken=${sessionToken}`)
        if(!response.ok) {
          const errorData = await response.json()
          setErrorMessage(errorData.error)
          console.error(errorData.error)
          return
        }
        const data:AddressSuggestion[] = await response.json()
        console.log("suge", data)
        setSuggestions(data)
      } catch (error) {
        setErrorMessage("予期せぬエラーが発生しました。")
        console.log("error")
      } finally {
        setIsLoading(false)
      }
    },1000)
  
    useEffect(() => {
        if(!inputText.trim()) {
          // setOpen(false)
          setSuggestions([])
          return
        }
        setIsLoading(true)
        // setOpen(true)
        fetchSuggestions(inputText)
    }, [inputText])

    const handleSelectSuggestion = async (suggestions: AddressSuggestion) => {

      try {
        await selectSuggestionAction(suggestions, sessionToken)
        setSessionToken(uuidv4())
      } catch(error) {
        alert("予期せぬエラー発生")
      }
    }

  return (
    <Dialog>
      <DialogTrigger>住所を選択</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>住所</DialogTitle>
          <DialogDescription className="sr-only">
            住所登録と選択
          </DialogDescription>
        </DialogHeader>

        <Command shouldFilter={false}>
          <div className="bg-muted mb-4">
          <CommandInput
            value={inputText}
            onValueChange={setInputText}
            placeholder="Type a command or search..." />
          </div>
        
          <CommandList>
            {inputText ? (
              <>
                
              <CommandEmpty>
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                 ) : errorMessage ? (
                  <div className="flex items-center text-destructive gap-2">
                    <AlertCircle />
                    {errorMessage}
                  </div>
                 ) : (
                  "住所が見つかりません"
                 )}
              </div>
            </CommandEmpty>

                {suggestions.map((suggestion) => (
                  <CommandItem 
                    onSelect={() => handleSelectSuggestion(suggestion)}
                    key={suggestion.placeId} 
                    className="p5">
                    <MapPin />
                    <div>
                      <p>{suggestion.placeName}</p>
                      <p>{suggestion.address_text}</p>
                    </div>
                  </CommandItem>
                ))}
              </>
            ) : (
              <>
              
                <h3 className="font-black text-lg mb-2">保存済みの住所</h3>
                <CommandItem className="p-5">Calendar</CommandItem>
                <CommandItem className="p-5">Search Emoji</CommandItem>
                <CommandItem className="p-5">Calculator</CommandItem>
              </>
            )}
            
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export default AddressModal