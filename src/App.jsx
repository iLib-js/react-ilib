/*
 * App.jsx - main app code for the react-ilib test app
 *
 * Copyright © 2018, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
// import { FormattedHTMLMessage } from 'react-intl';
import AddressFmt from './components/AddressFmt';
import Translate from './components/Translate';

//eslint-disable-next-line
import Address from 'ilib-es6/lib/Address';

var addresses = {
    US: new Address({
        streetAddress: "900 Jefferson Ave.",
        postalCode: "94063",
        locality: "Redwood City",
        region: "California",
        country: "United States of America",
        locale: "en-US"
    }),
    DE: new Address({
        streetAddress: "Erlenweg 7",
        postalCode: "69181",
        locality: "Leimen",
        region: "Swabenland",
        country: "Germany",
        locale: "de-DE"
    }),
    JP: new Address({
        streetAddress: "大手町１丁目７−２",
        postalCode: "100-8077",
        locality: "千代田区",
        region: "東京都",
        country: "日本",
        locale: "ja-JP"
    })
};

class App extends Component {
    render() {
        var addressesFormatted = [];
        for (var a in addresses) {
            addressesFormatted.push(<li>{a}: <AddressFmt locale={addresses[a].locale} address={addresses[a]}/></li>);
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React-ilib Test App</h1>
                </header>
                <p className="App-intro">
                    <Translate id="test.id" description="this is a test">
                        This app <i>tests</i> the <b>components</b> in react-ilib at this date/time: <p/><AddressFmt locale="en-US" address={addresses.US}/>.
                    </Translate>
                </p>
                <div className="App-body">
                    <p>
                            <h1><Translate>Addresses</Translate></h1>
                            <ul>{addressesFormatted}</ul>
                    </p>
                    <p>
                        <Translate comment="translator's comment">This is an address in the US formatted using AddressFmt:</Translate>
                        <AddressFmt locale="en-US" address={addresses.US}/>
                    </p>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    intl: PropTypes.object
};

export default App;
