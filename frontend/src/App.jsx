import React, { useState, useEffect } from 'react';
import './App.css';

function MarkdownConverter() {
  const [markdown, setMarkdown] = useState(''); // Store markdown content
  const [html, setHtml] = useState(''); // Store the converted HTML content

  // handle change in the text area
  const handleChange = (event) => {
    setMarkdown(event.target.value); // Update markdown content
  };

  // handle markdown submission to convert to HTML
  const handleSubmit = async () => {
    try {
      const response = await fetch('/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      });
      const result = await response.json();
      setHtml(result.html); // Assuming response contains the HTML
    } catch (error) {
      console.error('Error converting markdown:', error);
    }
  };

  // Use effect to trigger handleSubmit whenever markdown content changes
  useEffect(() => {
    if (markdown) {
      handleSubmit(); // Trigger conversion on every change
    }
  }, [markdown]); // This effect runs every time markdown changes

  return (
    <div className='main-container'>
      <h1>Markdown to HTML Converter</h1>
      <h2>Enter Markdown:</h2>
      <textarea
        value={markdown}
        onChange={handleChange}
        rows="10"
        cols="50"
        placeholder="Write or paste your markdown here"
      />

      <h2>Converted HTML:</h2>
      <div>
        <pre>{html}</pre> {/* Display converted HTML */}
      </div>
      <h2>Rendered Output:</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default MarkdownConverter;
