import React, { useState, useEffect } from 'react';

const FileExplorerDialog = ({ content, onClose }) => {
  const [currentContent, setCurrentContent] = useState(content);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setCurrentContent(content);
    setHistory([]);
  }, [content]);

  const handleItemClick = (itemKey) => {
    const item = currentContent.content[itemKey];
    if (item.type === 'folder') {
      setHistory([...history, currentContent]);
      setCurrentContent(item);
    } else if (item.type === 'file') {
      setHistory([...history, currentContent]);
      setCurrentContent(item);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousContent = history.pop();
      setHistory([...history]);
      setCurrentContent(previousContent);
    }
  };

  const renderContent = () => {
    if (currentContent.type === 'folder') {
      return (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(currentContent.content).map(([key, item]) => (
            <div
              key={key}
              className="flex flex-col items-center p-4 cursor-pointer hover:bg-gray-700 rounded"
              onClick={() => handleItemClick(key)}
            >
              {item.type === 'folder' ? (
                <span className="text-5xl mb-2">📂</span>
              ) : (
                <span className="text-5xl mb-2">📄</span>
              )}
              <span className="text-white text-sm">{key}</span>
            </div>
          ))}
        </div>
      );
    } else if (currentContent.type === 'file') {
      return (
        <div className="text-white text-left">
          <h3 className="text-2xl font-bold mb-2">{currentContent.data.title}</h3>
          <p className="text-lg mb-2">Role: {currentContent.data.role}</p>
          <p className="text-md">Details: {currentContent.data.details}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 border-2 border-white text-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl h-3/4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">File Explorer</h2>
        <div>
          {history.length > 0 && (
            <button
              onClick={handleBack}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded mr-2"
            >
              Back
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};

export default FileExplorerDialog; 