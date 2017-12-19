/**
 * Created by yaojunjun on 12/04/2017.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            username:'',
            token:null
        },
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            window.localStorage.ms_token = data.token;
            window.localStorage.ms_username = data.username;
            state.user.token = data.token;
            state.user.username = data.username;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('ms_token');
            localStorage.removeItem('ms_username');
            state.user.token = null;
            state.user.username = '';
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})