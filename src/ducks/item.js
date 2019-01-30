import { successType, errorType } from '../util/redux-observable-helpers';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as api from '../api';
import { ofType } from 'redux-observable';


// Action Types

const ITEM_LIST = '@item/list';
const ITEM_LIST_SUCCESS = successType(ITEM_LIST);
const ITEM_LIST_ERROR = errorType(ITEM_LIST);

const ITEM_DETAIL = '@item/detail';
const ITEM_DETAIL_SUCCESS = successType(ITEM_DETAIL);
const ITEM_DETAIL_ERROR = errorType(ITEM_DETAIL);

const actionTypes = {
    ITEM_LIST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_ERROR,
    ITEM_DETAIL,
    ITEM_DETAIL_SUCCESS,
    ITEM_DETAIL_ERROR,
}

// Action Creators

const listItems = (page = 1) => ({
    type: ITEM_LIST,
    page,
});

const listItemsSuccess = items => ({
    type: ITEM_LIST_SUCCESS,
    items,
});

const listItemsError = error => ({
    type: ITEM_LIST_ERROR,
    error,
});

const detailItem = id => ({
    type: ITEM_DETAIL,
    id,
});

const detailItemSuccess = item => ({
    type: ITEM_DETAIL_SUCCESS,
    item,
});

const detailItemError = error => ({
    type: ITEM_DETAIL_ERROR,
    error,
});

const actionCreators = {
    listItems,
    detailItem,
}

// reducer

const initialState = {
    list: [],
    page: 0,
    totalPages: 0,
};

function reducer(state = initialState, action) {

    switch (action.type) {
        case ITEM_LIST:
            return {
                ...state,
                loadingList: true,
            };
        case ITEM_LIST_SUCCESS:
            return {
                ...state,
                loadingList: false,
                list: action.items.ads,
                page: action.items.page,
                totalPages: action.items.total_pages,
                listError: undefined,
            };
        case ITEM_LIST_ERROR:
            return {
                ...state,
                loadingList: false,
                list: [],
                listError: action.error,
            };
        case ITEM_DETAIL:
            return {
                ...state,
                loadingItem: true,
            };

        case ITEM_DETAIL_SUCCESS: 
            return {
                ...state,
                loadingItem: false,
                selected: action.item,
                itemError: undefined,
            };
        case ITEM_DETAIL_ERROR: 
            return {
                ...state,
                loadingItem: false,
                selected: undefined,
                itemError: action.error,
            };
        default:
    }

    return state;
}

// epics

const listItemsEpic = action$ => action$.pipe(
    ofType(ITEM_LIST),
    mergeMap(({ page }) => from(api.listItems(page)).pipe(
        delay(500),
        map(listItemsSuccess),
        catchError(error => of(listItemsError(error))),
    )),
)

const detailItemEpic = action$ => action$.pipe(
    ofType(ITEM_DETAIL),
    mergeMap(({ id }) => from(api.getItem(id)).pipe(
        delay(500),
        map(detailItemSuccess),
        catchError(error => of(detailItemError(error))),
    )),
)

const epics = [
    listItemsEpic,
    detailItemEpic,
];

export default reducer;

export {
    actionTypes,
    actionCreators,
    epics,
}