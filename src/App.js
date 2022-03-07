import Card from './components/Card';
import './styles/styles.css';
import Spinner from './components/Spinner'
import { useState } from 'react';

let dynamicComponent;


function App() {

  const [isSpinner, setisSpinner] = useState(true);

  if (isSpinner){
    dynamicComponent = <Spinner/>
  } else {
    dynamicComponent = <Card/>
  }
  
  
  setTimeout(() => {
    setisSpinner(false)
  }, 1500);
  


  return (
    <div className="App">
      {dynamicComponent};
    </div>
  );
}

export default App;