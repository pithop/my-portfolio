'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const commands = {
  help: 'Available commands: about, skills, experience, contact, clear',
  about: "I'm a Master's student in Software Engineering at the University of Montpellier, passionate about building innovative solutions with Java, React, and cloud technologies.",
  skills: ['React', 'Next.js', 'Java', 'Spring Boot', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Azure'].join(', '),
  experience: "I've worked as a Web Developer at Mon centre référence and as an IT Technician at Agence du bassin hydraulique and IVENTEQ.",
  contact: "You can reach me at chahraouiidriss@gmail.com or via the contact form below.",
  clear: ''
};

export default function Terminal() {
  const [history, setHistory] = useState([{ type: 'output', content: 'Welcome! Type "help" to see available commands.' }]);
  const [input, setInput] = useState('');
  const { t } = useTranslation();

  const handleInputChange = (e) => setInput(e.target.value);

  const handleInput = (e) => {
    if (e.key !== 'Enter') return;
    
    const newHistory = [...history, { type: 'input', content: input }];
    const command = input.toLowerCase().trim();

    if (command === 'clear') {
        setHistory([]);
    } else if (commands[command]) {
        newHistory.push({ type: 'output', content: commands[command] });
    } else {
        newHistory.push({ type: 'output', content: `command not found: ${command}` });
    }
    
    setHistory(newHistory);
    setInput('');
  };

  useEffect(() => {
    // Dynamically update command content from translations
    commands.about = t('aboutContent');
    commands.skills = t('skillsData', { returnObjects: true }).slice(0, 8).join(', ') + '...';
  }, [t]);

  return (
    <div className="bg-black text-white font-mono p-4 rounded-lg shadow-2xl max-w-2xl mx-auto h-80 overflow-y-auto">
      {history.map((line, index) => (
        <div key={index}>
          {line.type === 'input' && (
            <div className="flex">
              <span className="text-green-400">user@idriss:~$</span>
              <p className="flex-1 ml-2">{line.content}</p>
            </div>
          )}
          {line.type === 'output' && <p>{line.content}</p>}
        </div>
      ))}
      <div className="flex">
        <span className="text-green-400">user@idriss:~$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInput}
          className="bg-transparent border-none text-white w-full focus:outline-none ml-2"
          autoFocus
        />
      </div>
    </div>
  );
}