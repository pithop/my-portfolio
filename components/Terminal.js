'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Terminal() {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);

  const getCommands = () => ({
    help: () => 'Available commands: about, skills, experience, contact, clear',
    about: () => t('aboutContent'),
    skills: () => t('skillsData', { returnObjects: true }).slice(0, 10).join(', ') + '...',
    experience: () => t('experienceData', { returnObjects: true }).map(e => `${e.title} at ${e.company}`).join(' | '),
    contact: () => "You can reach me at chahraouiidriss@gmail.com or use the form.",
    clear: () => {
      setHistory([]);
      return '';
    }
  });

  useEffect(() => {
    setHistory([{ type: 'output', content: t('terminalWelcome') || 'Welcome! Type "help" for commands.' }]);
  }, [t]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleInput = (e) => {
    if (e.key !== 'Enter' || !input) return;

    const command = input.toLowerCase().trim();
    const commands = getCommands();
    let output = commands[command] ? commands[command]() : `command not found: ${command}`;
    
    const newHistory = [...history, { type: 'input', content: input }];
    if (output) {
      newHistory.push({ type: 'output', content: output });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-2xl max-w-3xl mx-auto border border-slate-700">
      {/* Terminal Header */}
      <div className="flex items-center p-3 bg-slate-900 rounded-t-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <p className="text-center flex-1 text-sm text-slate-400">bash</p>
      </div>

      {/* Terminal Body */}
      <div 
        className="text-white font-mono p-4 h-80 overflow-y-auto"
        ref={terminalRef}
        onClick={() => terminalRef.current?.querySelector('input')?.focus()}
      >
        {history.map((line, index) => (
          <div key={index}>
            {line.type === 'input' ? (
              <div className="flex">
                <span className="text-green-400">user@idriss-portfolio:~$</span>
                <p className="flex-1 ml-2">{line.content}</p>
              </div>
            ) : (
               <p className="text-slate-300 whitespace-pre-wrap">{line.content}</p>
            )}
          </div>
        ))}
        <div className="flex">
          <span className="text-green-400">user@idriss-portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInput}
            className="bg-transparent border-none text-white w-full focus:outline-none ml-2"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
