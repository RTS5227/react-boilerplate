/**
 * Created by ltlam on 25/12/2016.
 */
import {createSelector, createSelectorCreator, defaultMemoize}  from 'reselect'
import lodash from 'lodash'
export const customerSelector = state => state[NAME];

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    lodash.isEqual
);
