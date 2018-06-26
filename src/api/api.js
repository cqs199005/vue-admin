import axios from 'axios'

//设置请求的基准路径
const url ="http://127.0.0.1:8888/api/private/v1/"
axios.defaults.baseURL=url

//设置路由拦截,添加请求头信息token
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    let token = localStorage.getItem('mytoken')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

//登录验证接口
export const checkLogin=params=>{
    return axios.post('login',params).then(res=>res.data)
}
//获取用户列表信息
export const getUserList=params=>{
    return axios.get('users',params).then(res=>res.data)
}
//改变用户状态
export const changeUserStatus=params=>{
  return axios.put(`users/${params.id}/state/${params.type}`)
}
//添加用户
export const addUser=params=>{
  return axios.post('users',params).then(res=>res.data)
}
//显示编辑用户信息
export const showUserById=params=>{
  return axios.get(`users/${params}`).then(res=>res.data)
}
//编辑用户信息
export const editUser=params=>{
  return axios.put(`users/${params.id}`,params).then(res=>res.data)
}
//删除用户信息
export const deleteUser=params=>{
  return axios.delete(`users/${params}`).then(res=>res.data)
}
//获取角色列表
export const getRoles=params=>{
  return axios.get("roles").then(res=>res.data)
}
//分配用户角色
export const grantRoles=params=>{
  return axios.put(`users/${params.id}/role`,params).then(res=>res.data)
}
//获取权限列表
export const getRights=params=>{
  return axios.get(`rights/${params.type}`).then(res=>res.data)
}
//删除角色权限
export const deleteRolesRight=params=>{
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res=>res.data)
}
//角色授权
export const grantRolesRight=(roleId,rids)=>{
  return axios.post(`roles/${roleId}/rights`,rids).then(res=>res.data)
}
//左侧菜单权限
export const getMenu=()=>{
  return axios.get('menus').then(res=>res.data)
}
//获取商品分类信息
export const getCategory=(params)=>{
  return axios.get('categories',{params:params}).then(res=>res.data)
}
//添加分类
export const addCategory=garams=>{
  return axios.post('categories',garams).then(res=>res.data)
}