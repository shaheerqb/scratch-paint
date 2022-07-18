import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Higher Order Component to manage inputs that submit on change and <enter>
 * @param {React.Component} Input text input that consumes onChange, onBlur, onKeyPress
 * @returns {React.Component} Live input that calls onSubmit on change and <enter>
 */
export default function (Input) {
    class LiveInput extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, ['handleChange', 'handleKeyPress', 'handleFlush']);
            this.state = {
                value: null
            };
        }
        handleKeyPress (e) {
            if (e.key === 'Enter') {
                this.handleChange(e);
                e.target.blur();
            }
        }
        handleFlush () {
            this.setState({value: null});
        }
        handleChange (e) {
            this.props.onSubmit(e.target.value);

            this.setState({value: e.target.value});
        }
        render () {
            const liveValue =
                this.state.value === null ? this.props.value : this.state.value;
            return (
                <Input
                    {...this.props}
                    value={liveValue}
                    onBlur={this.handleFlush}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
            );
        }
    }

    LiveInput.propTypes = {
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onSubmit: PropTypes.func.isRequired,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    return LiveInput;
}
