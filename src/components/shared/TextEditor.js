import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = ({ defaultValue, onChange, maxChars }) => {
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const [quillInstance, setQuillInstance] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'bullet' }],
          [{ align: [] }],
          ['link']
        ]
      }
    });

    const handleChange = () => {
      const text = editor.getText();
      setCharCount(text.length);
      onChange(editor.root.innerHTML);
    };

    editor.on('text-change', handleChange);

    if (defaultValue) {
      editor.clipboard.dangerouslyPasteHTML(defaultValue);
    }

    setQuillInstance(editor);

    return () => {
      if (editor.root.parentNode) {
        editor.root.parentNode.removeChild(editor.root);
      }
      editor.off('text-change', handleChange);
    };
  }, [defaultValue, onChange]);

  const handleTextChange = () => {
    const text = editorRef.current.innerText || '';
    if (text.length > maxChars) {
      editorRef.current.innerText = text.slice(0, maxChars);
    }
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div>
      <p>Characters: {charCount}</p>
      {charCount > maxChars && (
        <p className="text-red-500">Exceeding char limit!</p>
      )}
      <div
        ref={editorRef}
        style={{ minHeight: '400px' }}
        onInput={handleTextChange}
      ></div>
      {charCount > maxChars && (
        <p className="text-red-500">Maximum {maxChars} characters allowed!</p>
      )}
    </div>
  );
};

export default TextEditor;
