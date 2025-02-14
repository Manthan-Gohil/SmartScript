import React, { useState } from 'react';
import AnimatedText from './components/AnimatedText';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fade, setFade] = useState(false); 

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/articles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      setContent(data.article);
    } catch (error) {
      console.error('Error generating article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimize = async () => {
    try {
      setFade(true); // Trigger erasing animation
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/articles/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      setContent(data.optimizedArticle); // Update content with typing animation
    } catch (error) {
      console.error('Error optimizing article:', error);
    } finally {
      setIsLoading(false);
      setFade(false); // Allow typing animation
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Generator</h1>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter article title"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Generate Article'}
        </button>
        <button
          onClick={handleOptimize}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          disabled={isLoading || !content}
        >
          {isLoading ? 'Loading...' : 'Optimize'}
        </button>
      </div>
      <AnimatedText content={content} fade={fade} isLoading={isLoading} onContentChange={setContent} />
    </div>
  );
}

export default App;
