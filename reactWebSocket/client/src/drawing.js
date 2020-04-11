import React, {Component} from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine, subscribeToDrawingLines } from './api';

export default class Drawing extends Component{

    state= {
        lines: []
    }

    componentDidMount() {
        
        subscribeToDrawingLines(this.props.drawing.id, (linesEvent) => {
            debugger;
            this.setState((prevState) => {
                console.log(linesEvent.lines);
                return {
                    lines: [...prevState.lines, ...linesEvent.lines]
                }
            });
        })
    }

    handleDraw = (line) => {
        publishLine({
            drawingId: this.props.drawing.id,
            line
        });
    }


    render(){
        return (this.props.drawing) ? (
            <div 
                className="Drawing"
            >
                <div className="Drawing-title">{this.props.drawing.name}</div>
                <Canvas drawingEnabled={true}
                onDraw={this.handleDraw} 
                width="100%"
                height="400px"
                lines={this.state.lines}/>
            </div>
        )
     : null;
    }
}