import { useState , useCallback } from "react";

interface AISuggestionsState{
      suggestion:string| null
      isLoading:boolean
      position:{line: number;column:number} | null
      decoration:string[]
      isEnabled:boolean
}