import { routeActions } from 'react-router-redux';
import AppStoreService from './AppStoreService';
import { App } from './App';
import { Action } from 'redux';

const appStoreService = new AppStoreService();

export interface FetchAppStoreAction extends Action {
  type: 'FetchAppStoreAction'
}
export function FetchAppStoreAction() {
  return { type: 'FetchAppStoreAction' };
}

export interface ReceiveAppStoreAction extends Action {
  type: 'ReceiveAppStoreAction'
  appStore: App[]
}
export function ReceiveAppStoreAction(appStore: App[]): ReceiveAppStoreAction {
  return {
    type: 'ReceiveAppStoreAction',
    appStore: appStore
  };
}

export interface UpdateSearchTextAction extends Action {
  type: 'UpdateSearchTextAction'
  searchText: string
}
export function UpdateSearchTextAction(searchText: string): UpdateSearchTextAction {
  return {
    type: 'UpdateSearchTextAction',
    searchText
  };
}

export type AppStoreAction = FetchAppStoreAction | ReceiveAppStoreAction | UpdateSearchTextAction;

export function fetchStorefront(id: string): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      appStoreService.getAppStore(id)
        .then(apps => dispatch(ReceiveAppStoreAction(apps)))
        .catch(console.error);
      dispatch(FetchAppStoreAction());
    };
}
