"use server"
import { getPlaceDetails } from "@/lib/restaurants/api"
import { AddressSuggestion } from "@/types"

export const selectSuggestionAction = async (
  suggestion: AddressSuggestion, sessionToken: string) => {
  console.log(suggestion)
  const {data: locationData, error} = await getPlaceDetails(
    suggestion.placeId, 
    ["location"], 
    sessionToken)
  console.log(locationData)

 if (
    error ||
    !locationData ||
    !locationData.location ||
    !locationData.location.latitude ||
    !locationData.location.longitude
  ) {
    throw new Error("住所情報を取得できませんでした");
  }
  }