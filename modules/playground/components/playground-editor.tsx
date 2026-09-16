import React from 'react'
import { useState , useCallback , useRef } from 'react'
import { TemplateFile } from '../lib/path-to-json'
import { Monaco } from '@monaco-editor/react'


interface PlaygroundEditorProps{
  activeFile: TemplateFile | null
  content:string
  onContentChange: (value:string)=>void

}
const PlaygroundEditor = ({
activeFile,
content,
onContentChange
}:PlaygroundEditorProps) => {

  const editorRef = useRef<unknown>(null)
  const monacoRef = useRef<Monaco | null>(null)
  return (
    <div>PlaygroundEditor</div>
  )
}

export default PlaygroundEditor