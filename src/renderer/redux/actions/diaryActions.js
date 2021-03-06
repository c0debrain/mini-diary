import moment from 'moment';

import { searchIndex } from '../../helpers/searchIndex';


// Action creators

export function setDateSelected(dateSelected) {
	return {
		type: 'SET_DATE_SELECTED',
		payload: {
			dateSelected
		}
	};
}

function setSearchKey(searchKey) {
	return {
		type: 'SET_SEARCH_KEY',
		payload: {
			searchKey
		}
	};
}

function setSearchResults(searchResults) {
	return {
		type: 'SET_SEARCH_RESULTS',
		payload: {
			searchResults
		}
	};
}


// Thunks

export function search(searchKey) {
	return (dispatch) => {
		dispatch(setSearchKey(searchKey));
		const searchResults = searchIndex(searchKey);
		dispatch(setSearchResults(searchResults));
	};
}

export function setDaySelectedNext() {
	return (dispatch, getState) => {
		const { dateSelected } = getState().diary;
		const nextDay = moment(dateSelected).add(1, 'days');
		if (nextDay.isSameOrBefore(moment(), 'day')) {
			dispatch(setDateSelected(nextDay.toDate()));
		}
	};
}

export function setDateSelectedPrevious() {
	return (dispatch, getState) => {
		const { dateSelected } = getState().diary;
		const previousDay = moment(dateSelected).subtract(1, 'days');
		dispatch(setDateSelected(previousDay.toDate()));
	};
}

export function setMonthSelectedNext() {
	return (dispatch, getState) => {
		const { monthSelected } = getState().diary;
		const nextMonth = moment(monthSelected).add(1, 'months').startOf('month');
		if (nextMonth.isSameOrBefore(moment(), 'month')) {
			dispatch(setDateSelected(nextMonth.toDate()));
		}
	};
}

export function setMonthSelectedPrevious() {
	return (dispatch, getState) => {
		const { monthSelected } = getState().diary;
		const previousMonth = moment(monthSelected).subtract(1, 'months').startOf('month');
		dispatch(setDateSelected(previousMonth.toDate()));
	};
}
