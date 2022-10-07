import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [color, setColor] = useState<string>('');
  const [answer, setAnswer] = useState<string[]>([]);
  const [cycle, setCycle] = useState<boolean | undefined>(undefined);

  const getHex = (): string => {
    let red: string = Math.floor(Math.random() * 255).toString(16);
    let green: string = Math.floor(Math.random() * 255).toString(16);
    let blue: string = Math.floor(Math.random() * 255).toString(16);

    return `#${red}${green}${blue}`
  }

  const generateColor = () => {
    const actualColor = getHex();
    setColor(actualColor)
    setAnswer([actualColor, getHex(), getHex()].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    generateColor()
  }, [])

  const guessAnswer = (answer: string) => {
    if (answer === color) {
      setCycle(true);
      generateColor()
    } else if (answer !== color) {
      setCycle(false);
    }
  }

  return (
    <>
      <div className='parent'>
        <div className='block' style={{ backgroundColor: color }}></div>
      </div>
      <div className='buttons'>
        {answer.map(button => <button onClick={() => guessAnswer(button)} key={button}>{button}</button>)}
      </div>
      <div className='message'>
        {cycle === true && <div style={{color: 'green'}}>Correct answer!</div>}
        {cycle === false && <div style={{color: 'red'}}>Wrong answer!</div>}
      </div>
    </>
  );
}

export default App;
