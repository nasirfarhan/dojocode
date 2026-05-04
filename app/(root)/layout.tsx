import {Header} from "@/modules/home/header"
import { Metadata } from "next"
import { Footer } from "react-day-picker"


export const metadata: Metadata = {
    title:{
        template: "dojocode - Editor",
        default: "Code Editor for Vibe Coders" 
    },
}

export default function HomeLayout({
    children
}:{
    children: React.ReactNode
}){
    return (
        <>
        <Header/>
        {/* Header*/}
        {/* bg effect and grid */}
        {/* main */}
        {/* footer */}
        <Footer/>
        </>
    )
}