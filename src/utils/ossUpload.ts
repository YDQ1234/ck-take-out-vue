/**
 * OSS 图片上传工具
 */
import { uploadAPI } from '@/api/upload'

export interface UploadResponse {
  code: number
  message: string
  data: string  // 返回的图片 URL
}

/**
 * 上传图片到 OSS
 * @param file 文件对象
 * @param folder 文件夹名称（employee, dish, setmeal 等）
 * @returns 返回图片的 OSS URL
 */
export const uploadImageToOSS = async (file: File, folder: string = 'images'): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await uploadAPI(formData)

 // 增加判空，防止 undefined 报错
    if (!response.data) {
      throw new Error('上传接口返回异常')
    }

    if (response.data.code === 0) {
      return response.data.data  // 返回图片 URL
    } else {
      throw new Error(response.data.message || '上传失败')
    }
  } catch (error: any) {
    console.error('图片上传失败：', error)
    throw new Error(error.message || '图片上传失败')
  }
}