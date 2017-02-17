import React,{Component} from 'react';
import'../App.css';

/*
class Input extends Component = () => (
    <View style={styles.inputContainer}>
        <TextInput
            value={inputValue}
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextcolor="#CACACA"
            selectionColor="#666666"
            onTextChange={inputChange || } />
    </View>
)
*/


class Input extends Component{
    constructor(props){
        super(props);
        this.state = {text : ''};
        this.onInputValChanged = this.onInputValChanged.bind(this);
        this.onInputTyped = this.onInputTyped.bind(this);
        
    }

    render(){
        const { inputValue, inputChange } = this.props;
        return(
            <div className="inputContainer">
                <input type="text"
                    value={this.state.text}
                    className="input"
                    placeholder="What needs to be done?"
                    onChange={this.onInputTyped} //{ (text) => this.setState({text})} 
                    onBlur={this.onInputValChanged}/>
            </div>
        );
    }

    onInputTyped(evnt){
        this.setState({text: evnt.target.value});
    }
    onInputValChanged(evnt){
        this.props.inputChange(this.state.text);
    }
};

export default Input;