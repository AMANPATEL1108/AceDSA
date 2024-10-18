import React from "react";
import Editor from "@monaco-editor/react";
import { FaClock, FaUndo, FaSpinner, FaCode } from "react-icons/fa";
import { formatTime } from "../../utils/formatTime";
import { handleEditorWillMount, handleEditorDidMount } from "../../utils/editorConfig";

const CodeEditor = ({ code, setCode, isLoggedIn, handleLogin, handleSubmit, problem, elapsedTime }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-green-400">Code Editor</h3>
        <div className="flex items-center">
          <FaClock className="text-green-400 mr-2" />
          <span className="text-xl font-bold text-green-400">
            {formatTime(elapsedTime)}
          </span>
        </div>
        {isLoggedIn && (
          <button
            onClick={() => setCode(problem.template)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-blue-600 transition duration-300"
          >
            <FaUndo className="mr-2" />
            Reset Code
          </button>
        )}
      </div>
      <div className="relative">
        <Editor
          height="50vh"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly: !isLoggedIn,
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            acceptSuggestionOnEnter: "off",
            tabCompletion: "off",
            wordBasedSuggestions: false,
            parameterHints: { enabled: false },
            contextmenu: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
            },
          }}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
        {!isLoggedIn && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-600 transition duration-300"
            >
              Login to Code
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={!isLoggedIn}
          className={`w-full bg-green-500 text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center transition duration-300 ${
            !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          {isLoggedIn ? (
            <>
              <FaCode className="mr-2 text-xl" />
              <span>Submit Solution</span>
            </>
          ) : (
            <>
              <FaSpinner className="animate-spin mr-2 text-xl" />
              <span>Login to Submit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
