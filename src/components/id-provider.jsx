import React from 'react';
import PropTypes from 'prop-types';

import Input from './forms/input.jsx';
import InputGroup from './input-group/input-group.jsx';
import LiveInputHOC from './forms/live-input2-hoc.jsx';


const LiveInput = LiveInputHOC(Input);
const IdProviderComponent = props => (
    <InputGroup disabled={props.disabled}>
        <LiveInput
            small
            placeholder="id"
            disabled={props.disabled}
            type="text"
            value={props.svgName ? props.svgName : ''}
            onSubmit={props.onChangeId}
        />
    </InputGroup>
);

IdProviderComponent.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChangeId: PropTypes.func.isRequired,
    svgName: PropTypes.string
};

export default IdProviderComponent;
