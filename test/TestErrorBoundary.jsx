/*
 * TestErrorBoundary.js - an error boundary component to use with the
 * unit tests.
 * 
 * Copyright © 2019, JEDLSoft
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

import * as React from 'react';
import PropTypes from 'prop-types';

export default class TestErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        const { test } = props;
        this.state = {
            hasError: false,
            test: test
        };
    }
    
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    
    componentDidCatch(error, info) {
        this.state.test.ok(true);
    }
    
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Caught React exception.</h1>;
        }
        
        return this.props.children; 
    }
};
