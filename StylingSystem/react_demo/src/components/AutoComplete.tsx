import React,{useState, useEffect} from 'react';

interface ItemProps{
    name: string;
    id:number
}

//further optimizations - use react virtual list where in only the components that are in visible window are rendered (not all the components that match the query).
// this would involve calculating which set of items should be visible in users view window based on scroll position and item height.
export default function AutoComplete() {
    const [items, setItems] = useState<ItemProps[]>([]);
    const [query, setQuery] = useState<string>('');
    useEffect(() => {
        const handler = setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => setItems(json.filter((item:ItemProps) => item.name.toLowerCase().includes(query.toLowerCase()))));
        }, 1000);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);
 
    return (
        <div style={styles.autoComplete}>
            <div><input type="text" placeholder="AutoComplete Input" onKeyUp={(e)=> setQuery(e.currentTarget.value)}/></div>
            <div><ul style={styles.autoCompleteList}>
                {items.map((item, index) => (
                    <li style={styles.autoCompleteListItem} key={item.id}>{item.name}</li>
                ))}
            </ul></div>
         </div>
    );

}

const styles = {
    autoCompleteList: {
        border: '1px solid white',
        maxHeight: '400px',
        overflowY: 'auto' as 'auto',
        zIndex: 1000,
         width: '200px',
        flex:1,
        padding:0,
        marging:0,
        listStyleType: 'none' as 'none'
    },
    autoCompleteListItem: {
        borderBottom: '1px solid white',
    },
    autoComplete:{
        width: '200px',
        display: 'flex', 
        flexDirection: 'column' as 'column'        
    }
}