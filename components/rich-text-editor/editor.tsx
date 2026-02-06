"use client";
import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Menubar } from "./menubar";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

type RichTextEditorField = ControllerRenderProps<FieldValues, string>;

function parseContent(value: unknown): JSONContent | string {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "<p></p>";
  }
  try {
    return JSON.parse(value) as JSONContent;
  } catch {
    return value;
  }
}

export function RichTextEditor({ field }: { field: RichTextEditorField }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose md:prose-lg lg:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: parseContent(field.value),
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30 ">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
