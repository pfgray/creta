
import * as React from 'react';
import App from './App';
import { Input } from 'react-bootstrap';
import { UpdateSearchTextAction } from './appStore/AppStoreActions';
import * as Infinite from 'react-infinite';

console.log("uhhh... acualt got: ", Infinite);

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

export default ({ dispatch, loading, apps, searchText }) => {
  const trimmed = searchText.trim();
  const terms = searchText.split(' ');
  var filtered = trimmed === '' ? apps :
    _.filter(apps as any[], app => {
      var { title, description } = app.casaDescriptor.attributes.use;
      return _.some([title, description], attr => {
        return _.some(terms, term => containsStr(attr, term));
      });
  });



  var apps = filtered.map(app => {
    const { casaDescriptor: { identity: {originator_id, id}}} = app;
    return <App app={app} key={originator_id + id} highlights={terms}/>;
  });

  var appList = !loading ? apps : (
    <div className='loading-container'>
      <i className="fa fa-circle-o-notch fa-spin"></i>
    </div>
  );

  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2'>
          <div className='search-box'>
            <Input type='text' placeholder='Find'
                   value={searchText} onChange={updateSearch(dispatch)} />
          </div>
        </div>
      </div>
      <div>
        <div className='app-store-list'>
          <InfiniteWut containerHeight={200} elementHeight={40}>
            {appList}
          </InfiniteWut>
        </div>
      </div>
    </div>
  );
}
