
import * as React from 'react';
import App from './App';
import { Input } from 'react-bootstrap';
import { UpdateSearchTextAction } from './appStore/AppStoreActions';
import * as Infinite from 'react-infinite';
import { Maybe, Just, Nothing } from '../helper/Maybe';

type State = {
  windowHeight: number
  windowWidth: number
}

const InfiniteWut: any = Infinite;

function containsStr(str1, str2){
  return str1 && str2 &&
      str1 !== '' && str2 !== '' &&
      str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
}

const updateSearch = dispatch => event =>
  dispatch({
    type: 'UpdateSearchTextAction',
    searchText: event.target.value
  });

export default class AppList extends React.Component<any, State> {
  constructor(props){
    super(props);
    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }
  }
  componentDidMount(){
    window.addEventListener('resize', event => {
      this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      });
    });
  }
  render() {
    const height = this.state.windowHeight - 56 - 73;

    const elementHeight = 120;

    const { dispatch, loading, apps, searchText } = this.props;
    const trimmed = searchText.trim();
    const terms = searchText.split(' ');
    var filtered = trimmed === '' ? apps :
      _.filter(apps as any[], app => {
        var { title, description } = app.casaDescriptor.attributes.use;
        return _.some([title, description], attr => {
          return _.some(terms, term => containsStr(attr, term));
        });
    });

    var appElements = filtered.map(app => {
      const { casaDescriptor: { identity: {originator_id, id}}} = app;
      return <App app={app} key={originator_id + id} highlights={terms}/>;
    });

    var appList = !loading ? appElements : (
      <div className='loading-container'>
        <i className="fa fa-circle-o-notch fa-spin"></i>
      </div>
    );

    return (
      <div>
        <div className="app-store-list-header">
          <div className="container">
            <div className='row'>
              <div className='col-sm-8 col-sm-offset-2'>
                <div className='search-box'>
                  <Input type='text' placeholder='Find'
                         value={searchText} onChange={updateSearch(dispatch)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='app-store-list'>
          <InfiniteWut containerHeight={height} elementHeight={elementHeight}>
            {appList}
          </InfiniteWut>
        </div>
      </div>
    );
  }
}
