import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = ({ defaultValue, onChange, maxChars }) => {
  const editorRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const [quillInstance, setQuillInstance] = useState(null);

  // Expose the Quill instance to the parent component
  // via a callback ref
  // useEffect is used to ensure that the editorRef is available
  useEffect(() => {
    if (!editorRef.current) return;

    // Create a new Quill instance and attach it to the editorRef
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

    // Set the editor to the current value every time it changes
    // and update the character count
    const handleChange = () => {
      const text = editor.getText();
      setCharCount(text.length);
      onChange(editor.root.innerHTML);
    };

    editor.on('text-change', handleChange);

    // Set the default value if it exists, it is passed as a prop
    if (defaultValue) {
      editor.clipboard.dangerouslyPasteHTML(defaultValue);
    }

    // Set the Quill instance to the state so it can be accessed by the parent component
    setQuillInstance(editor);

    return () => {
      if (editor.root.parentNode) {
        editor.root.parentNode.removeChild(editor.root);
      }
      editor.off('text-change', handleChange);
    };
  }, [defaultValue, onChange]);


  // Update the character count when the editorRef changes
  const handleTextChange = () => {
    const text = editorRef.current.innerText || '';
    if (text.length > maxChars) {
      editorRef.current.innerText = text.slice(0, maxChars);
    }
    // every time there is a change in the editor, update the character count
    // innerHTML is used to get the HTML content of the editor
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
