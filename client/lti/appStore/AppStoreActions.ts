import { routeActions } from 'react-router-redux';
import AppStoreService from './AppStoreService';
import { App } from './App';
import { Action } from 'redux';

const appStoreService = new AppStoreService();

export interface FetchAppStoreAction extends Action {
  type: 'FetchAppStoreAction'
}

export interface ReceiveAppStoreAction extends Action {
  type: 'ReceiveAppStoreAction'
  appStore: App[]
}

export interface UpdateSearchTextAction extends Action {
  type: 'UpdateSearchTextAction'
  searchText: string
}

export type AppStoreAction = FetchAppStoreAction | ReceiveAppStoreAction | UpdateSearchTextAction;

export function fetchStorefront(id: string): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      appStoreService.getAppStore(id)
        .then(apps => dispatch({
          type: 'ReceiveAppStoreAction',
          appStore: apps
        }))
        .catch(console.error);
      dispatch({ type: 'FetchAppStoreAction' });
    };
}
