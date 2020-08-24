/* 路由配置采用异步获取，本地所有src下的.router.js文件都被读取*/
import Layout from '@/components/lvbu/layout'
export default {
  path: '/org-manage',
  component: Layout,
  redirect: '/org-manage/user-dep-manager',
  name: 'org',
  meta: {
    title: 'org Routes',
    icon: 'fsicon-weibiaoti25'
  },
  children: [
     {
      path: 'user-dep-manager',
      component: () => import('@/pages/org-manage/user-dep-manager/index'),
      name: '用户部门管理',
      meta: { title: '用户部门管理' }
    },
    {
      path: 'role-manager',
      component: () => import('@/pages/org-manage/role-manager/index'),
      name: '角色管理',
      meta: { title: '角色管理' }
    },
    
  ]
}