import { routeActions } from 'react-router-redux';
import PeerService from './PeerService';
import Peer from './Peer';
import { Action } from 'redux';

const peerService = new PeerService();

export interface FetchPeersAction extends Action {
  type: 'FetchPeersAction'
}

export interface ReceivePeersAction extends Action {
  type: 'ReceivePeersAction'
  peers: Peer[]
}

export interface CreatePeerAction extends Action {
  type: 'CreatePeerAction'
}

export interface EditPeerAction extends Action {
  type: 'EditPeerAction'
}

export interface SyncPeerAction extends Action {
  type: 'SyncPeerAction'
  id: string
}

export interface EndSyncPeerAction extends Action {
  type: 'EndSyncPeerAction'
  id: string
}

export interface ConfirmDeletePeerAction extends Action {
  type: 'ConfirmDeletePeerAction'
  peerId: string
}

export interface CancelConfirmDeletePeerAction extends Action {
  type: 'CancelConfirmDeletePeerAction'
}

export interface DeletePeerAction extends Action {
  type: 'DeletePeerAction'
  peerId: string
}

export interface EndDeletePeerAction extends Action {
  type: 'EndDeletePeerAction'
  peerId: string
}

export type PeerAction = FetchPeersAction | ReceivePeersAction | CreatePeerAction | EditPeerAction | SyncPeerAction | EndSyncPeerAction | ConfirmDeletePeerAction | CancelConfirmDeletePeerAction | DeletePeerAction | EndDeletePeerAction

export function receivePeers(peers: Peer[]): ReceivePeersAction {
  return {
    type: 'ReceivePeersAction',
    peers
  };
}

export function endSync(id: string): EndSyncPeerAction {
  return {
    type: 'EndSyncPeerAction',
    id
  };
}

export function fetchPeers(): (d: (Action) => void) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      peerService.getPeers()
      .then(peers => dispatch(receivePeers(peers)))
      .catch(console.error);
      dispatch({ type: 'FetchPeersAction' })
    };
}

export function createPeer(peer: Peer): (d: any) => void {
  return dispatch => {
      peerService.createPeer(peer)
      .then(peer => {
        //todo: redirect back to peer list.
        dispatch(routeActions.push('/repos'));
      })
      .catch(console.error);
      dispatch({ type: 'CreatePeerAction()' });
    };
}

export function updatePeer(id: string, peer: Peer): (d: any) => void {
  return dispatch => {
      peerService.updatePeer(id, peer)
      .then(peer => {
        console.log('updated peer...');
        //todo: redirect back to peer list.
        dispatch(routeActions.push('/repos'));
      });
      dispatch({ type: 'EditPeerAction' });
    };
}

export function syncPeer(id: string): (d: any) => void {
  console.log('syncing peer:', id);
  return dispatch => {
      peerService.syncPeer(id)
        .then(peer => {
          peerService.getPeers()
          .then(peers => {
            dispatch(receivePeers(peers))
            dispatch(endSync(id))
          })
        })
        .catch(console.error);
      dispatch({ type: 'SyncPeerAction', id });
    };
}

export function confirmDeletePeer(peerId: string): ConfirmDeletePeerAction {
  console.log('gbuilding confirm detele peer: ', peerId);
  return { type: 'ConfirmDeletePeerAction', peerId };
}

export function cancelConfirmDeletePeer(): CancelConfirmDeletePeerAction {
  return { type: 'CancelConfirmDeletePeerAction' };
}

export function deletePeer(peerId: string) {
  return dispatch => {
    peerService.deletePeer(peerId)
    .then(() => {
      dispatch({ type: 'EndDeletePeerAction', peerId })
    });
    dispatch({ type: 'DeletePeerAction', peerId });
  }
}
