import * as React from 'react';

//eslint-disable-next-line
import ilib from 'ilib/lib/ilib-getdata';

class AddressFmt extends React.Component {
    render() {
        const {
            locale,
            style,
            address,
            ...rest
        } = this.props;

        return "Sun Jun 1, 2018";
    }
}

export default AddressFmt;
