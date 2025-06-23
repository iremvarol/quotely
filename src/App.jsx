import React, { useState, useEffect } from 'react';
import quotes from './data/quotes';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [language, setLanguage] = useState('tr');
  const [darkMode, setDarkMode] = useState(false);
  const [quote, setQuote] = useState(null);

  // Yeni rastgele quote getir, aynıysa tekrar dene
  const getRandomQuote = (currentQuote) => {
    const quoteList = quotes[language];
    let newQuote;
    do {
      newQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
    } while (currentQuote && newQuote.text === currentQuote.text);
    return newQuote;
  };

  // İlk yüklemede bir quote getir
  useEffect(() => {
    setQuote(getRandomQuote(null));
  }, [language]);

  // Otomatik geçiş (her 10 saniyede bir)
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote((prevQuote) => getRandomQuote(prevQuote));
    }, 10000);
    return () => clearInterval(interval);
  }, [language]);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    setQuote(getRandomQuote(quote));
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#f9f5ec] to-[#d7e6e7] dark:from-[#1e1f21] dark:to-[#2c2f35] transition-colors duration-500 flex flex-col font-sans">

        {/* Dark mode butonu */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm bg-[#ded6cc] px-3 py-1 rounded-md shadow-sm dark:bg-[#444950] dark:text-white hover:scale-105 transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Quote içeriği */}
        <div className="flex flex-col items-center justify-center text-center flex-1 p-4">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => switchLanguage('tr')}
              className="px-4 py-2 bg-[#a8dadc] text-gray-800 rounded-md shadow hover:bg-[#8bc4c6] transition"
            >
              🇹🇷 Türkçe
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className="px-4 py-2 bg-[#e5989b] text-white rounded-md shadow hover:bg-[#dc7680] transition"
            >
              🇬🇧 English
            </button>
          </div>

          <AnimatePresence mode="wait">
            {quote && (
              <motion.div
                key={quote.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-[#2d3142] dark:text-white p-6 rounded-2xl shadow-2xl max-w-md transition-all duration-300"
              >
                <p className="text-xl font-semibold mb-4 leading-relaxed">"{quote.text}"</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">— {quote.author}</p>

                <button
                  onClick={() => setQuote(getRandomQuote(quote))}
                  className="bg-[#6a4c93] text-white px-4 py-2 rounded-md shadow hover:bg-[#5a3c7a] transition"
                >
                  {language === 'tr' ? 'Yeni Bir Söz Göster' : 'Show Another Quote'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;