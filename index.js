import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

const incre= "increment";
const dec = 'decrement';
const increByAmount = "incrementByAmount";

//store
const store = createStore(reducer,applyMiddleware(logger.default));

const history =[];



function reducer(state={amount:1},action){
    if(action.type ===incre){
        //immutability
        return {amount:state.amount+1};
    }
    if(action.type ===dec){
        //immutability
        return {amount:state.amount-1};
    }
    if(action.type ===increByAmount){
        //immutability
        return {amount:state.amount + action.payload};
    }
    return state;
}

//Action creators
function increment(){
    return {type:incre};
}

function decrement(){
    return {type:dec}
}

function incrementByAmount(value){
    return {type:increByAmount,payload:value}
}

// setInterval(() => {
//     store.dispatch({type:'incrementByAmount',payload:4})
// }, 5000);

setInterval(() => {
    store.dispatch(incrementByAmount(2));
}, 2000);

// store.subscribe(()=>{
//     history.push(store.getState());
//     console.log(history);
// });

// console.log(store.getState());