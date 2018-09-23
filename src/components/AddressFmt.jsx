import * as React from 'react';

const Address = require('ilib/lib/Address');
const AddressFormatter = require('ilib/lib/AddressFmt');

class AddressFmt extends React.Component {
    constructor(props) {
        super(props);
        const {
            locale,
            style
        } = props;
        
        this.fmt = new AddressFormatter({
            locale: locale,
            style: style
        });
    }
    
    render() {
        const {
            locale,
            style,
            address,
        } = this.props;

        let a = new Address(address);
        
        return this.fmt.format(a);
    }
}

export default AddressFmt;
