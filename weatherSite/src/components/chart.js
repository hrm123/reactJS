import React, { Component } from 'react';
import { Sparklines, SparklinesLine} from 'react-sparklines';

export default class Chart extends Component {
    constructor(props){
        super(props);
        //this.state =  {term :''};
        //this.onInputChange = this.onInputChange.bind(this); // needed so that this will be SearchBar Component in the call back
        //this.onFormSubmit = this.onFormSubmit.bind(this); 
    }

  render() {
    return (
        <div>
            <Sparklines height={120} width={180} data={this.props.data}>
                <SparklinesLine color={this.props.color}>
                </SparklinesLine>
            </Sparklines>
        </div>
    );

    }
}