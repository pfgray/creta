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

export interface SelectAppAction extends Action {
  type: 'SelectAppAction',
  appId: number
}
export function SelectAppAction(appId: number){
  return { type: 'SelectAppAction', appId };
}
export interface CancelSelectAppAction extends Action {
  type: 'CancelSelectAppAction'
}
export function CancelSelectAppAction(){
  return { type: 'CancelSelectAppAction' };
}

export type AppStoreAction = FetchAppStoreAction | ReceiveAppStoreAction | UpdateSearchTextAction | SelectAppAction | CancelSelectAppAction;

export function fetchStorefront(id: string): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      appStoreService.getAppStore(id)
        .then(apps => dispatch(ReceiveAppStoreAction(apps)))
        .catch(console.error);
      dispatch(FetchAppStoreAction());
    };
}
