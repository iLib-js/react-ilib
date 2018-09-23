import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
// import { FormattedHTMLMessage } from 'react-intl';
import AddressFmt from './components/AddressFmt';
import Translate from './components/Translate';

//eslint-disable-next-line
const ilib = require('ilib/lib/ilib-getdata');
const Address = require('ilib/lib/Address');

var address = new Address({
    streetAddress: "900 Jefferson Ave.",
    postalCode: "94063",
    locality: "Redwood City",
    region: "California",
    country: "United States of America",
    locale: "en-US"
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React-ilib Test App</h1>
                </header>
                <p className="App-intro">
                    <Translate id="test.id" description="this is a test">
                        This app <i>tests</i> the <b>components</b> in react-ilib at this date/time: <AddressFmt locale="de-DE" address={address}/>.
                    </Translate>
                </p>
                <p>
                    This is an address in the US formatted using AddressFmt: 
                    <AddressFmt locale="en-US" address={address}/>
                </p>
            </div>
        );
    }
}

App.contextTypes = {
    intl: PropTypes.object
};

export default App;
