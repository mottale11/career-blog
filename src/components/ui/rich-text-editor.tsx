"use client"

import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { Button } from "./button"
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Link as LinkIcon,
    Table as TableIcon,
    Trash2,
    Undo,
    Redo,
} from "lucide-react"

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
    placeholder?: string
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null
    }

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return (
        <div className="flex flex-wrap gap-2 border-b bg-muted/40 p-2">
            <Button
                variant={editor.isActive("bold") ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                type="button"
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("italic") ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                type="button"
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }}
                type="button"
            >
                <Heading1 className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}
                type="button"
            >
                <Heading2 className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }}
                type="button"
            >
                <Heading3 className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("bulletList") ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
                type="button"
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("orderedList") ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }}
                type="button"
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("link") ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); addLink(); }}
                type="button"
            >
                <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
                variant={editor.isActive("table") ? "default" : "ghost"}
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); }}
                type="button"
            >
                <TableIcon className="h-4 w-4" />
            </Button>
            {editor.isActive("table") && (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().deleteTable().run(); }}
                    type="button"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
            <div className="flex-1" />
            <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}
                disabled={!editor.can().chain().focus().undo().run()}
                type="button"
            >
                <Undo className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}
                disabled={!editor.can().chain().focus().redo().run()}
                type="button"
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    )
}

const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline",
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: "border-collapse table-auto w-full border border-border",
                }
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: "border border-border bg-muted p-2 text-left font-bold",
                }
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: "border border-border p-2",
                }
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "min-h-[400px] w-full bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 prose dark:prose-invert max-w-none",
            },
        },
    })

    // Update editor content if content prop changes externally (and isn't just a result of our own typing)
    // This is tricky with Tiptap. Ideally we rely on initialContent, but if we need Reactive updates from parent:
    // useEffect(() => {
    //   if (editor && content !== editor.getHTML()) {
    //     editor.commands.setContent(content)
    //   }
    // }, [content, editor])
    // NOTE: For this form usage, initial load is enough. Bi-directional sync while typing causes cursor jumps.

    return (
        <div className="flex min-h-[450px] w-full flex-col rounded-md border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="flex-1 overflow-y-auto p-2" />
        </div>
    )
}

export { RichTextEditor }
