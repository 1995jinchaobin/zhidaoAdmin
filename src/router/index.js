import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/login/Login')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/Home'),
			children: [{
                  path: '/',
                  name: 'HomeCount',
                  component: () => import('../views/home/HomeCount')
                },{
                    path: '/flowerPattern',
                    name: 'FlowerPattern',
                    component: () => import('../views/content/FlowerPattern')
                },
                {
                  path: '/roleList',
                  name: 'RoleList',
                  component: () => import('../views/roleManage/roleList')
                },
                {
                  path: '/copyrightReview',
                  name: 'CopyrightReview',
                  component: () => import('../views/content/CopyrightReview')
                },
                {
                  path:'/materialPattern',
                  name:'MaterialPattern',
                  component: () => import('../views/content/MaterialPattern')
                },{
                  path: '/studioAudit',
                  name: 'StudioAudit',
                  component: () => import('../views/content/StudioAudit')
                },{
                  path: '/storeFlowerManage',
                  name: 'StoreFlowerManage',
                  component: () => import('../views/flowerManage/StoreFlowerManage')
                },{
                  path: '/userFlowerManage',
                  name: 'UserFlowerManage',
                  component: () => import('../views/flowerManage/UserFlowerManage')
                },{
                  path: '/myUploadFlowerManage',
                  name: 'MyUploadFlowerManage',
                  component: () => import('../views/flowerManage/MyUploadFlowerManage')
                },{
                  path: '/userMaterialManage',
                  name: 'UserMaterialManage',
                  component: () => import('../views/materialManage/UserMaterialManage')
                },{
                  path: '/storeMaterialManage',
                  name: 'StoreMaterialManage',
                  component: () => import('../views/materialManage/StoreMaterialManage')
                },{
                  path: '/userShadingManage',
                  name: 'UserShadingManage',
                  component: () => import('../views/materialManage/UserShadingManage')
                },{
                  path: '/userManage',
                  name: 'UserManage',
                  component: () => import('../views/userManage/UserManage')
                },{
                  path: '/studioEditor',
                  name: 'StudioEditor',
                  component: () => import('../views/content/StudioEditor')
                }, {
                  path: '/sectorManagement',
                  name: 'SectorManagement',
                  component: () => import('../views/content/SectorManagement')
                }, {
                  path: '/loginLog',
                  name: 'LoginLog',
                  component: () => import('../views/content/LoginLog')
                }, {
                  path: '/operationLog',
                  name: 'OperationLog',
                  component: () => import('../views/content/OperationLog')
                }, {
                  path: '/userManagement',
                  name: 'UserManagement',
                  component: () => import('../views/content/UserManagement')
                },{
                  path: '/invoiceManagement',
                  name: 'InvoiceManagement',
                  component: () => import('../views/content/InvoiceManagement')
                },
                {
                  path: '/storeFlowerManage',
                  name: 'StoreFlowerManage',
                  component: () => import('../views/flowerManage/StoreFlowerManage')
                },
                {
                  path: '/purseDetails',
                  name: 'PurseDetails',
                  component: () => import('../views/content/PurseDetails')
                },{
                  path: '/userPersonal',
                  name: 'UserPersonal',
                  component: () => import('../views/content/UserPersonal')
                },{
                  path: '/config',
                  name: 'Config',
                  component: () => import('../views/content/Config')
                },{
                  path: '/feedBack',
                  name: 'FeedBack',
                  component: () => import('../views/DataStatistics/FeedBack')
                },{
                  path: '/subscribe',
                  name: 'Subscribe',
                  component: () => import('../views/DataStatistics/Subscribe')
                },{
                  path: '/InfoBox',
                  name: 'InfoBox',
                  component: () => import('../views/common/InfoBox')
                },{
                  path: '/OSSUpload',
                  name: 'OSSUpload',
                  component: () => import('../views/common/OSSUpload')
                },{
                  path: '/OSSUploadNoBtn',
                  name: 'OSSUploadNoBtn',
                  component: () => import('../views/common/OSSUploadNoBtn')
                },{
                  path: '/ProgressBar',
                  name: 'ProgressBar',
                  component: () => import('../views/common/ProgressBar')
                },{
                  path: '/ProgressBar2',
                  name: 'ProgressBar2',
                  component: () => import('../views/common/ProgressBar2')
                },{
                  path: '/Template2D',
                  name: 'Template2D',
                  component: () => import('../views/template/Template2D')
                },{
                  path: '/UserTemplate2D',
                  name: 'UserTemplate2D',
                  component: () => import('../views/template/UserTemplate2D')
                },{
                  path: '/flowerTemplate',
                  name: 'FlowerTemplate',
                  component: () => import('../views/template/FlowerTemplate')
                },{
                  path: '/userAliPic',
                  name: 'UserAliPic',
                  component: () => import('../views/content/UserAliPic')
                },{
                  path: '/userAliPicClicks',
                  name: 'UserAliPicClicks',
                  component: () => import('../views/content/UserAliPicClicks')
                },{
                  path: '/userAlipicBinds',
                  name: 'UserAlipicBinds',
                  component: () => import('../views/content/UserAlipicBinds')
                },{
                  path: '/thermodynamicDiagram',
                  name: 'ThermodynamicDiagram',
                  component: () => import('../views/BehaviorMonitoring/ThermodynamicDiagram')
                },{
                  path: '/monitoringBehavior',
                  name: 'MonitoringBehavior',
                  component: () => import('../views/BehaviorMonitoring/MonitoringBehavior')
                },
                {
                  path:'/UserAnnal',
                  name:'UserAnnal',
                  component: () => import('../views/BehaviorMonitoring/UserAnnal')
                },
                {
                  path:'/masksManage',
                  name:'MasksManage',
                  component: () => import('../views/masksManage/MasksManage')
                },
                {
                  path:'/supplyReview',
                  name:'supplyReview',
                  component: () => import('../views/masksManage/supplyReview')
                }
              ]
    }
  ]
})
