import request from '@/utils/request' // 引入自定义的axios函数


export const uploadAPI = (formData: FormData) => {
  return request({
    url: '/file/upload',
    method: 'post',
    data: formData  // 这里必须直接传 FormData
  })

}