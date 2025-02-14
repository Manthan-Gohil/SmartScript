import React, { useRef } from 'react';

const TextEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerText);
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      className="min-h-[200px] p-4 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto text-gray-700 whitespace-pre-line focus:outline-none focus:ring-2 focus:ring-blue-400"
      onInput={handleInput}
      suppressContentEditableWarning={true}
    >
      {content || 'No content to display. Please generate or optimize an article.'}
    </div>
  );
};

export default TextEditor;
