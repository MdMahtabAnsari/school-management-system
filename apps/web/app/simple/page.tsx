"use client"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { useState,useEffect } from "react"

export default function Page() {
  const [content, setContent] = useState<string>("")
  useEffect(() => {
    console.log("content", content)
  }, [content])
  

  return <SimpleEditor content={content} onContentChange={setContent} editable={false} />
}
