import React, {ReactElement, ReactNode, useState} from 'react';

export function SlowComponent(){
    // Simulate a slow component
    const start = Date.now();
    while (Date.now() - start < 100) {
        // Busy wait for ms
    }
    return <div style={{marginTop: '20px'}}>I'm a slow component!</div>;
}

interface ScrollerProps {
    child: ReactNode;
}

// Improved Scroller that accepts a child component. Since child component that is 'slow' is render prop, it does not re-render on every scroll.
// React knows that props are immutable and hence it does not rerender/rebuild child component on every state change of Scroller.

const  Scroller: React.FC<ScrollerProps> = ({child} ) => {
    const [position, setPosition] = useState(110);
    
    const onScroll = (e: any) => {
        const calc = e.target.scrollTop;
        setPosition(calc);
    }

    return (
        <div onScroll={onScroll} style={{height: '200px', overflowY: 'scroll', border: '1px solid black'}}>
            <div style={{height: '500px', paddingTop: `${position}px`}}>
                <div style={{marginTop: '20px'}}>Current Position (shows happy scroll): {position}px</div>
                {child}
            </div>
        </div>
    );
} 

export default Scroller;