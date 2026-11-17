"use client";

import React, { useEffect, useState } from "react";
import "ckeditor5/ckeditor5.css";

export default function CKEditorWrapper({ value, onChange, placeholder = "Write your story here..." }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [editorModules, setEditorModules] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function loadModules() {
            try {
                const [ckeditorModule, ckeditorReactModule] = await Promise.all([
                    import("ckeditor5"),
                    import("@ckeditor/ckeditor5-react"),
                ]);

                if (isMounted) {
                    setEditorModules({
                        ClassicEditor: ckeditorModule.ClassicEditor,
                        CKEditor: ckeditorReactModule.CKEditor,
                        plugins: [
                            ckeditorModule.Essentials,
                            ckeditorModule.Paragraph,
                            ckeditorModule.Heading,
                            ckeditorModule.Bold,
                            ckeditorModule.Italic,
                            ckeditorModule.Underline,
                            ckeditorModule.Strikethrough,
                            ckeditorModule.BlockQuote,
                            ckeditorModule.List,
                            ckeditorModule.Link,
                            ckeditorModule.HorizontalLine,
                            ckeditorModule.Table,
                            ckeditorModule.TableToolbar,
                            ckeditorModule.Undo,
                        ],
                    });
                    setEditorLoaded(true);
                }
            } catch (err) {
                console.error("Failed to load CKEditor modules:", err);
            }
        }

        loadModules();

        return () => {
            isMounted = false;
        };
    }, []);

    if (!editorLoaded || !editorModules) {
        return (
            <div className="w-full h-72 border border-border rounded-xl bg-[#faf8f5] flex flex-col items-center justify-center gap-2 text-xs text-muted font-sans">
                <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                <span>Loading CKEditor Rich Text Editor...</span>
            </div>
        );
    }

    const { ClassicEditor, CKEditor, plugins } = editorModules;

    return (
        <div className="ckeditor-custom-container">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    licenseKey: "GPL",
                    plugins: plugins,
                    toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "|",
                        "link",
                        "blockQuote",
                        "horizontalLine",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "insertTable",
                    ],
                    heading: {
                        options: [
                            { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                            { model: "heading2", view: "h2", title: "Heading 2 (H2)", class: "ck-heading_heading2" },
                            { model: "heading3", view: "h3", title: "Heading 3 (H3)", class: "ck-heading_heading3" },
                            { model: "heading4", view: "h4", title: "Heading 4 (H4)", class: "ck-heading_heading4" },
                        ],
                    },
                    table: {
                        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                    },
                    placeholder: placeholder,
                }}
                data={value || ""}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    if (onChange) {
                        onChange(data);
                    }
                }}
            />
            <style jsx global>{`
                .ckeditor-custom-container .ck-editor__editable {
                    min-height: 280px;
                    max-height: 650px;
                    background-color: #ffffff !important;
                    font-family: inherit;
                    font-size: 14px;
                    line-height: 1.7;
                    color: #2b2420;
                    padding: 1rem 1.25rem !important;
                }
                .ckeditor-custom-container .ck-toolbar {
                    background: #fbf9f5 !important;
                    border-color: #e6dece !important;
                    border-top-left-radius: 0.75rem !important;
                    border-top-right-radius: 0.75rem !important;
                }
                .ckeditor-custom-container .ck-editor__editable_inline {
                    border-color: #e6dece !important;
                    border-bottom-left-radius: 0.75rem !important;
                    border-bottom-right-radius: 0.75rem !important;
                }
                .ckeditor-custom-container .ck-editor__editable:focus {
                    border-color: #c9a24a !important;
                    box-shadow: 0 0 0 1px #c9a24a !important;
                }
                .ckeditor-custom-container .ck.ck-editor__editable_inline blockquote {
                    border-left: 3px solid #c9a24a;
                    padding-left: 1rem;
                    font-style: italic;
                    color: #4a3f35;
                    margin: 1rem 0;
                }
                .ckeditor-custom-container .ck.ck-editor__editable_inline ul {
                    list-style-type: disc !important;
                    padding-left: 1.5rem !important;
                    margin: 0.75rem 0 !important;
                }
                .ckeditor-custom-container .ck.ck-editor__editable_inline ol {
                    list-style-type: decimal !important;
                    padding-left: 1.5rem !important;
                    margin: 0.75rem 0 !important;
                }
                .ckeditor-custom-container .ck.ck-editor__editable_inline h2 {
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                    color: #221c17;
                }
                .ckeditor-custom-container .ck.ck-editor__editable_inline h3 {
                    font-size: 1.35rem;
                    font-weight: 600;
                    margin-top: 1rem;
                    margin-bottom: 0.4rem;
                    color: #221c17;
                }
                .ckeditor-custom-container .ck.ck-editor__editable_inline h4 {
                    font-size: 1.15rem;
                    font-weight: 600;
                    margin-top: 0.75rem;
                    margin-bottom: 0.3rem;
                    color: #221c17;
                }
            `}</style>
        </div>
    );
}
