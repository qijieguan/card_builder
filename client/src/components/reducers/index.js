import CardList from './CardList.js';
import { combineReducers } from 'redux';

const allReducer = combineReducers({
    CardList: CardList
});

export default allReducer;