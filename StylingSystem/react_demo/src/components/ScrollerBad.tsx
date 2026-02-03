import React, {useState} from 'react';

function SlowComponent(){
    // Simulate a slow component
    const start = Date.now();
    while (Date.now() - start < 100) {
        // Busy wait for ms
    }
    return <div style={{marginTop: '20px'}}>I'm a slow component!</div>;
}

export default function ScrollerBad(){
    const [position, setPosition] = useState(110);
    
    const onScroll = (e: any) => {
        const calc = e.target.scrollTop;
        setPosition(calc);
    }

    return (
        <div onScroll={onScroll} style={{height: '200px', overflowY: 'scroll', border: '1px solid black'}}>
            <div style={{height: '500px', paddingTop: `${position}px`}}>
                <div style={{marginTop: '20px'}}>Current Position (shows choppy scroll): {position}px</div>
                <SlowComponent />
            </div>
        </div>
    );
} 