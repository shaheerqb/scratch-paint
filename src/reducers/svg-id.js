import {CHANGE_SELECTED_ITEMS} from './selected-items';
import {getColorsFromSelection} from '../helper/style-path';

const CHANGE_ID = 'scratch-paint/change-id/CHANGE-ID';
const initialState = '';

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CHANGE_ID:
    case CHANGE_SELECTED_ITEMS:
        // Don't change state if no selection
        if (!action.selectedItems || !action.selectedItems.length) {
            return state;
        }
        // Bitmap mode doesn't have stroke width
        if (action.bitmapMode) {
            return state;
        }
        return getColorsFromSelection(action.selectedItems, action.bitmapMode).svgName;
    default:
        return state;
    }
};

// Action creators ==================================
const changeId = function (svgName) {
    return {
        type: CHANGE_ID,
        svgName: svgName
    };
};

export {
    reducer as default,
    changeId,
    CHANGE_ID
    
};
