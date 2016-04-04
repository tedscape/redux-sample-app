import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore(){
    console.log(1234);

    return createStore(reducer);
}