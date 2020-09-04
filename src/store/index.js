import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import hdfs from './modules/hdfs'
import bigroot from './modules/bigroot'
import spark from './modules/spark'
import aliload from './modules/aliload'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    d2admin,
    hdfs,
    bigroot,
    spark,
    aliload
  }
})
