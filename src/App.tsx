import { useState } from 'react';
import './App.css';
import ExamCompOne from './components/ExamComponentOne';
import ExamCompTwo from './components/ExamComponentTwo';

function App() {
  const [compOne, setCompOne] = useState(false);
  const [compTwo, setCompTwo] = useState(false);

  return (
    <div>
      {(!compOne && !compTwo) && <div className='container m-auto w-full h-screen flex flex-row items-center justify-center space-x-5'>
        <button className='p-2 border border-indigo-500 rounded-md text-white w-1/3 hover:bg-white hover:text-black hover:border-none' onClick={() => setCompOne(true)}>Comp 1</button>
        <button className='p-2 border border-indigo-500 rounded-md text-white w-1/3 hover:bg-white hover:text-black hover:border-none' onClick={() => setCompTwo(true)}>Comp 2</button>
      </div>}
      {compOne && <ExamCompOne /> }
      {compTwo && <ExamCompTwo />}
    </div>
  );
}

export default App;
