import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {applyIdToSelection} from '../helper/style-path';
import Modes from '../lib/modes';
import IdProviderComponent from '../components/id-provider.jsx';
import {changeId} from '../reducers/svg-id';
class IdProvider extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleChangeId']);
    }
    handleChangeId (newName) {
        const changed = applyIdToSelection(newName, this.props.textEditTarget);

        this.props.onChangeId(newName);
        if (changed) this.props.onUpdateImage();
    }
    render () {
        return (
            <IdProviderComponent
                disabled={this.props.disabled}
                svgName={this.props.svgName}
                onChangeId={this.handleChangeId}
            />
        );
    }
}

const mapStateToProps = state => {
    let svgNameFromSelection = '';
    const selectedItems = state.scratchPaint.selectedItems[0];
    if (selectedItems) {
        if ('name' in selectedItems) {
            svgNameFromSelection = selectedItems.name;
        }
    }
    return {
        disabled:
            state.scratchPaint.mode === Modes.BRUSH ||
            state.scratchPaint.mode === Modes.TEXT ||
            state.scratchPaint.mode === Modes.FILL,
        // format: state.scratchPaint.format,
        svgName: svgNameFromSelection,
        textEditTarget: state.scratchPaint.textEditTarget
    };
};
const mapDispatchToProps = dispatch => ({
    onChangeId: svgName => {
        dispatch(changeId(svgName));
    }
});

IdProvider.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChangeId: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    svgName: PropTypes.string,
    textEditTarget: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(IdProvider);
