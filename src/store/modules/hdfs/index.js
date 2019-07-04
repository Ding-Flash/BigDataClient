export default {
    namespaced: true,
    state:{
        currentTask: {},
        activeTab : 'sampler',
        selectFunc: ''
    },
    mutations:{
        setTask(state, payload){
            state.currentTask = payload;
        },
        setActiveTab(state, payload){
          state.activeTab = payload;
        },
        setSelectFunc(state, payload){
            state.selectFunc = payload;
        }
    },
    getters:{

    }
}