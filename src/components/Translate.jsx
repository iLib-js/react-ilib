import * as React from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

import hash from '../utils/hash';
import Composition from '../utils/Composition';

class Translate extends React.Component {
    constructor(props) {
        super(props);
        
        // these parameters echo the ones in react-intl's FormattedMessage component, plus a few extra
        const {
            id,             // the unique id of the string
            description,    // a note for translators to describe to them the context of this string
            defaultMessage, // The English string + HTML + components that you want translated
            values,         // object containing values to substitute into the translated string
            //eslint-disable-next-line
            count,          // used with plurals. This is the value to switch upon
            children,       // the components within the body 
            intl            // the intl object injected into this instance
        } = this.props;

        let sourceElements = defaultMessage || children;
        this.composition = new Composition(sourceElements);
        this.str = this.composition.compose();

        let resId;

        if (!id) {
            throw new Error(`Translate component found without the required id prop. Approximate string: ${this.str}`);
        }
        if (!description) {
            throw new Error(`Translate component found without the required description prop. Id: ${id} Approximate string: ${this.str}`);
        }

        if (sourceElements) {
            const text = this.composition.compose();
            resId = id || hash(text);
            this.translation = intl.formatMessage({
                id: resId,
                defaultMessage: text,
                description: description
            }, values);
        } else {
            throw new Error("Translate component with no defaultMessage prop and no child elements. Can't translate 'nothing!'");
        }

        this.state = {
            id: resId,
            count: this.props.count,
            values: this.props.values
        };
    }

    render() {
        // always wrap the translated string in a span tag to contain everything and to give us a spot to put the id
        return React.createElement("span", {
            key: this.state.id, 
            "x-mojito-id": this.state.id
        }, this.composition.decompose(this.translation));
    }
}

/* make sure eslint is happy with accessing the children property above */
Translate.propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    defaultMessage: PropTypes.element,
    count: PropTypes.number,
    values: PropTypes["object"]
};

export default injectIntl(Translate);
