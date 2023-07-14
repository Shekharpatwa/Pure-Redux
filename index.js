import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

const init = 'account/init';
const incre= "account/increment";
const dec = 'account/decrement';
const increByAmount = "account/incrementByAmount";
const getAccUserPending = 'account/getUser/pending';
const getAccUserFulfilled = 'account/getUser/fulfilled';
const getAccUserRejected = 'account/getUser/rejected';
const incBonus = 'bonus/increment';

//store
const store = createStore(combineReducers({
    account:accountReducer,
    bonus:bonusReducer
}),applyMiddleware(logger.default,thunk.default));

const history =[];



function accountReducer(state={points:1},action){

    switch(action.type){
        case getAccUserFulfilled:
            return {amount:action.payload,pending:false};
        
        case getAccUserRejected:
            return {...state,error:action.error,pending:false};

        case getAccUserPending:
            return {...state,pending:true};

        case incre:
            return {amount:state.amount+1};

        case dec:
            return {amount:state.amount-1};

        case increByAmount:
            return {amount:state.amount + action.payload};

        default:
            return state;
    }
}

function bonusReducer(state={points:0},action){
    switch(action.type){
        case incBonus:
            return {points:state.points+1};

        case increByAmount:
            if(action.payload >=100)
                return {points:state.points+1};
        
        default:
            return state;
    }
}

//Action creators

function getUserAccount(id){
    return async (dispatch,getState)=>{
        try{
            dispatch(getAccountUserPending())
            const {data} = await axios.get(`http://localhost:3000/accounts/${id}`)
            dispatch(getAccountUserFulfilled(data.amount));
        }
        catch(error){
            dispatch(getAccountUserRejected(error.message));
        }
    }
}

function initUser(value){
    return {type:getAccUserFulfilled, payload:value};
}

function increment(){
    return {type:incre};
}

function decrement(){
    return {type:dec}
}

function incrementByAmount(value){
    return {type:increByAmount,payload:value}
}

function incrementBonus(){
    return {type:incBonus}
}

function getAccountUserFulfilled(value){
    return {type:getAccUserFulfilled, payload:value};
}

function getAccountUserPending(value){
    return {type:getAccUserPending, payload:value};
}

function getAccountUserRejected(error){
    return {type:getAccUserRejected, error:error};
}

// setInterval(() => {
//     store.dispatch({type:'incrementByAmount',payload:4})
// }, 5000);

setTimeout(() => {
    store.dispatch(getUserAccount(2));
    // store.dispatch(incrementByAmount(2));
    // store.dispatch(incrementBonus());
}, 2000);

// store.subscribe(()=>{
//     history.push(store.getState());
//     console.log(history);
// });

// console.log(store.getState());

//Asyc api call

async function apiCall(){
    const {data} = await axios.get('http://localhost:3000/accounts/1')
    console.log(data);
}

// apiCall();