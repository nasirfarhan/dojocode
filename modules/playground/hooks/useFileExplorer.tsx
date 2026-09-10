import { create } from 'zustand'

import { TemplateFile, TemplateFolder } from '../lib/path-to-json'
import { get } from 'http'


interface OpenFile {
    id: string,
    hasUnsavedChanges: boolean,
    content: string,
    originalContent: string
}
interface FileExplorerState {
    playgroundId: string,
    templateData: TemplateFolder | null,
    openFiles: OpenFile[],
    activeFileId: string,
    editorContent: string
    //setter functions
    setPlaygroundId: (id: string) => void
    setTemplateData: (data: TemplateFolder | null) => void
    setEditorContent: (content: string) => void
    setActiveFieldId: (fieldId: string | null) => void
    setOpenFiles: (files: OpenFile[]) => void

    //functions
    openFile:(file:TemplateFile)=>void
    closeFile:(fieldId:string)=> void
    closeAllFiles:()=>void
}
//@ts-ignore
    export const useFileExplorer = create <FileExplorerState>((set,get)=>({
    templateData: null,
    playgroundId: "",
    openFiles: [] satisfies OpenFile[],
    activeFileId:null,
    editorContent:"",

    setTemplateData:(data)=>set({templateData:data}),
    
    setPlaygroundId(id){
        set({playgroundId:id})
    },
       setEditorContent: (content) => set({editorContent: data}),
       setActiveFieldId: (files) => set({openFiles:files}),
       setOpenFiles: (fileId: OpenFile[]) => set({activeFileId:fileId}),


        openFile:(file) => {
            
        },
    }))


