import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Hello from '../Hello';

describe('<Hello>', function () {

  beforeEach(function() {
    //let {TestUtils} = React.addons;

    this.component = TestUtils.renderIntoDocument(<Hello/>);
    this.renderedDOM = () => React.findDOMNode(this.component);
  });

  it('renders without problems', function () {
    expect(this.component).toBeDefined();
    expect(this.renderedDOM).toBeDefined();
  });
});
