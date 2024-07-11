'use client'

import React, { useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  getEditor?: (editor: { getValue: () => string }) => void;
}

const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
};

const TextEditor: React.FC<TextEditorProps> = ({
  className,
  placeholder,
  defaultValue,
  value: alsoDefaultValue,
  onChange = () => {},
  getEditor = () => {},
}) => {
  const $editorContRef = useRef<HTMLDivElement | null>(null);
  const $editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useLayoutEffect(() => {
    if (!$editorRef.current) return;

    if (!quillRef.current) {
      const quill = new Quill($editorRef.current, { placeholder, ...quillConfig });
      quillRef.current = quill;

      const initialValue = defaultValue || alsoDefaultValue || '';
      quillRef.current.clipboard.dangerouslyPasteHTML(0, initialValue);
    }

    const getHTMLValue = () => {
      return $editorContRef.current?.querySelector('.ql-editor')?.innerHTML || '';
    };

    getEditor({ getValue: getHTMLValue });

    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };

    quillRef.current?.on('text-change', handleContentsChange);
    return () => {
      quillRef.current?.off('text-change', handleContentsChange);
    };
  }, [$editorRef, onChange, getEditor]);

  return (
    <div className={`${className} p-2`}>
      <div ref={$editorContRef} className="border border-gray-200 rounded-md">
        <div ref={$editorRef} className="min-h-[110px] text-gray-900 text-base"></div>
      </div>
    </div>
  );
};

export default TextEditor;