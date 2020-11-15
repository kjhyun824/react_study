import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SAMPLE_API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';

const Convert = ({ language, text }) => {
  const [output, setOutput] = useState('');
  const [debounced, setDebounced] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  useEffect(() => {
    const translate = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debounced,
            target: language.value,
            key: SAMPLE_API_KEY,
          },
        },
      );

      setOutput(data.data.translations[0].translatedText);
    };

    translate();
  }, [language, debounced]);

  return (
    <div>
      <h1 className="ui header">{output}</h1>
    </div>
  );
};

export default Convert;
