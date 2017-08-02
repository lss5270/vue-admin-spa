//像这种没有路径和文件夹名字的模块，从哪里查找？
//从node_modules文件夹中查找'js-cookie'的文件夹，然后文件夹中查找package.json文件，
//然后从json文件中查找'main'属性值:'src/js.cookie.js'
import Cookies from 'js-cookie';  

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.includes(view)) return
      state.visitedViews.push(view)
    },
    DEL_VISITED_VIEWS: (state, view) => {
      const index = state.visitedViews.indexOf(view)
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({ commit }, view) => {
      commit('DEL_VISITED_VIEWS', view)
    }
  }
};

export default app;
