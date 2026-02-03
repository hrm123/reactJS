import React from 'react';
import './App.css';
// import ScrollerBad from './components/ScrollerBad';
// import Scroller, { SlowComponent } from './components/Scroller';
// import AutoComplete from './components/AutoComplete';
import VirtualScroller,{ExampleListItems} from './components/VirtualScroller';

function App() {
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <VirtualScroller items={ExampleListItems} itemHeight={30} windowHeight={500} />
      {/*<AutoComplete />
      <ScrollerBad />
      <Scroller child={<SlowComponent />} />
      */}
    </div>
  );
}

export default App;
