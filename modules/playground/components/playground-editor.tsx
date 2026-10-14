
import React, { useCallback, useEffect, useRef } from "react";
import { TemplateFile } from "../lib/path-to-json";
import { Editor, Monaco } from "@monaco-editor/react";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "../lib/editor-config";
import { editor } from "monaco-editor";

interface PlaygroundEditorProps {
  activeFile: TemplateFile | null;
  content: string;
  onContentChange: (value: string) => void;

  suggestion: string | null,
  suggestionLoading: boolean
  suggestionPosition:{line: number , column:number} | null
  onAcceptSuggestion: (editor:any , monaco:any) => void
  onRejectSuggestion:(editor:any)=> void
  onTriggerSuggestion:(type:string , editor:any)=>void
}

const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,

  suggestion,
  suggestionLoading,
  suggestionPosition,
  onAcceptSuggestion,
  onRejectSuggestion,
  onTriggerSuggestion,
}: PlaygroundEditorProps) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const inlineCompletionProviderRef = useRef<any>(null)
  const currentSuggestionRef = useRef<{
    text: string
    position: { line: number; column: number }
    id: string
  } | null>(null)
  const isAcceptingSuggestionRef = useRef(false)
  const suggestionAcceptedRef = useRef(false)
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tabCommandRef = useRef<any>(null)


  const handleEditorDidMount = (
    editor: any,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    console.log("Editor mounted", !!editorRef.current);

    editor.updateOptions({
      ...defaultEditorOptions,
    });

    configureMonaco(monaco);
    updateEditorLanguage()
  };

  useEffect(() => {
    updateEditorLanguage();
  }, []);

  return (
    <div className="h-full relative">
      <Editor
        height="100%"
        value={content}
        onChange={(value) => onContentChange(value || "")}
        onMount={handleEditorDidMount}
        language={
          activeFile
            ? getEditorLanguage(activeFile.fileExtension || "")
            : "plaintext"
        }
        //@ts-ignore
        options={defaultEditorOptions}
      />
    </div>
  );
};

export default PlaygroundEditor;

