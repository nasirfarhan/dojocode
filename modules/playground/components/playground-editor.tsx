
import React, { useCallback, useEffect, useRef } from "react";
import { TemplateFile } from "../lib/path-to-json";
import { Editor, Monaco } from "@monaco-editor/react";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "../lib/editor-config";

interface PlaygroundEditorProps {
  activeFile: TemplateFile | null;
  content: string;
  onContentChange: (value: string) => void;
}

const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
}: PlaygroundEditorProps) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);


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

