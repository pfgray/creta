import { Action } from 'redux';
import { App } from './App';
import { AppStoreAction } from './AppStoreActions';
import { Maybe, Just, Nothing } from '../../helper/Maybe';

export interface AppStoreState {
  loading: boolean,
  appStore: App[],
  searchText: string,
  selectedApp: Maybe<number>
}

const initialState: AppStoreState = {
  loading: true,
  appStore: [],
  searchText: '',
  selectedApp: Nothing()
};

//This only exists for when/if we add auth inside the client (need to set it without refreshing page)
export default function(state: AppStoreState = initialState, a: AppStoreAction): AppStoreState {
  switch(a.type) {
    case 'FetchAppStoreAction':
      return Object.assign({}, state, {
        loading: true
      });

    case 'ReceiveAppStoreAction':
      return Object.assign({}, state, {
        loading: false,
        appStore: a.appStore
      });

    case 'UpdateSearchTextAction':
      return Object.assign({}, state, {
        searchText: a.searchText
      });

    case 'SelectAppAction':
      return Object.assign({}, state, {
        selectedApp: Just(a.appId)
      });

    case 'CancelSelectAppAction':
      return Object.assign({}, state, {
        selectedApp: Nothing()
      });

    default:
      return state;
  }
}
