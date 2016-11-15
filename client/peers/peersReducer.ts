import { Action } from 'redux';
import { PeerAction } from './PeerActions';
import Peer from './Peer';

interface PeerState {
  loading: boolean
  peers: Peer[],
  confirmingDeletePeer: string
}

const initialState: PeerState = {
  loading: true,
  peers: [],
  confirmingDeletePeer: null
};

export default function(state: PeerState = initialState, a: PeerAction): PeerState {
switch(a.type){
  case 'ReceivePeersAction':
    return Object.assign({}, state, {
      loading: false,
      peers: a.peers
    });

  case 'FetchPeersAction':
    return Object.assign({}, state, {
      loading: true
    });

  case 'SyncPeerAction':
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(a.id, state.peers, {
        syncing: true
      })
    });

  case 'EndSyncPeerAction':
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(a.id, state.peers, {
        syncing: false
      })
    });

  case 'ConfirmDeletePeerAction':
    return Object.assign({}, state, {
      confirmingDeletePeer: a.peerId
    });

  case 'CancelConfirmDeletePeerAction':
    return Object.assign({}, state, {
      confirmingDeletePeer: null
    });

  case 'DeletePeerAction':
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(a.peerId, state.peers, {
        deleting: true
      })
    });

  case 'EndDeletePeerAction':
    return Object.assign({}, state, {
      peers: state.peers.filter((peer:any) => peer._id !== a.peerId),
      confirmingDeletePeer: null
    });

  default:
    return state;
}}

const mergeToPeerWithId = (id: string, peers: any[], data: any) => {
  return peers.map(peer => peer._id === id ? Object.assign({}, peer, data) : peer);
}
