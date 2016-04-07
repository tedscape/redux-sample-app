import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

store.dispatch({
    type:require('./entries.json')
});
store.dispatch({
    type:'NEXT'
});