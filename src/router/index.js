import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import logon from '@/components/logon'
import setting from '@/components/setting'

import choice_room from '@/components/choice_room'
import choice_pc from '@/components/choice_pc'
import addroom from '@/components/addroom'
import addteacher from '@/components/addteacher'
import deleteroom from '@/components/deleteroom'
import deletepc from '@/components/deletepc'
import delete_teacher from '@/components/delete_teacher'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // children:[
      //   {
      //     path: '/login',
      //     name: 'login',
      //    component: login
      //   }
      //   ,{
      //     path: '/logon',
      //     name: 'logon',
      //     component: logon
      //   }
      //   ,{
      //     path: '/setting',
      //     name: 'setting',
      //     component: setting,
         
      //   }
      //   ,{
      //     path: '/choice_room',
      //     name: 'choice_room',
      //     component: choice_room,
      //   }
      //   ,{
      //     path: '/choice_pc',
      //     name: 'choice_pc',
      //     component: choice_pc,
      //   }
      //   ,{
      //     path: '/addroom',
      //     name: 'addroom',
      //     component: addroom
      //   }
      //   ,{
      //     path: '/addteacher',
      //     name: 'addteacher',
      //     component: addteacher
      //   }
      //   ,{
      //     path: '/deleteroom',
      //     name: 'deleteroom',
      //     component: deleteroom,
      //   }
      //   ,{
      //     path: '/deletepc',
      //     name: 'deletepc',
      //     component: deletepc,
      //   }
      //   ,{
      //     path: '/delete_teacher',
      //     name: 'delete_teacher',
      //     component: delete_teacher,
      //   }
      // ]
    }
    ,{
      path: '/login',
      name: 'login',
      component: login
    }
    ,{
      path: '/logon',
      name: 'logon',
      component: logon
    }
    ,{
      path: '/setting',
      name: 'setting',
      component: setting,
     
    }
    ,{
      path: '/choice_room',
      name: 'choice_room',
      component: choice_room,
    }
    ,{
      path: '/choice_pc',
      name: 'choice_pc',
      component: choice_pc,
    }
    ,{
      path: '/addroom',
      name: 'addroom',
      component: addroom
    }
    ,{
      path: '/addteacher',
      name: 'addteacher',
      component: addteacher
    }
    ,{
      path: '/deleteroom',
      name: 'deleteroom',
      component: deleteroom,
    }
    ,{
      path: '/deletepc',
      name: 'deletepc',
      component: deletepc,
    }
    ,{
      path: '/delete_teacher',
      name: 'delete_teacher',
      component: delete_teacher,
    }
  ]
})
