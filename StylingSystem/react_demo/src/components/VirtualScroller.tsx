import React, {useState, FC, useRef, JSX,  useMemo} from 'react';
import throttle from 'lodash/throttle';

interface VirtualScrollerProps{
    items: Array<JSX.Element>;
    itemHeight: number;
    windowHeight: number;
}


export const ExampleListItems = Array.from({ length: 100000 }, (_, index) => (
    //TODO - classnames are better than inline styles for performance
    <li key={index} style={{borderBottom: '1px solid gray', boxSizing: 'border-box', paddingLeft: '10px',paddingTop: '10px', height: '30px' }}>
        Item #{index + 1}
    </li>
));

const VirtualScroller : FC<VirtualScrollerProps> = ({items, itemHeight, windowHeight}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLUListElement>(null);

    // Total height of the "phantom" scrollable area
    const totalHeight = items.length * itemHeight;

    
    const visibleStart = Math.floor(scrollTop/itemHeight);
    const visibleEnd = Math.min(items.length -1, Math.ceil((scrollTop + windowHeight)/itemHeight));

    const onScrollThrottle = useMemo(() => {
        return throttle((e: any) => {
                setScrollTop(e.currentTarget?.scrollTop ?? e.target.scrollTop);
            }, 60, {leading: false});
        }, []);

    const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
                console.log('scrolling');
                setScrollTop(e.currentTarget.scrollTop);
        };

        const visibleChildren =  React.useMemo(() => {
        return items.slice(visibleStart, visibleEnd + 1).map((child, index) =>
        React.cloneElement(child, {
            style: {
            position: "absolute",
            top: (visibleStart + index) * itemHeight + index * 0,
            height: itemHeight,
            left: 0,
            right: 0,
            lineHeight: `${itemHeight}px`
            }
        })
        );
    }, [items, visibleStart, visibleEnd, itemHeight]);



    return(
        <ul
        onScroll={onScrollThrottle}
        style={{
            overflowY: "auto",
            position: "relative",
            width: '300px',
            height:'300px',
            border: '1px solid black',
            margin:10,
        }}
        ref={containerRef}
        className="container"
        >
        {visibleChildren}
        </ul>
     

    )
}

export default VirtualScroller;