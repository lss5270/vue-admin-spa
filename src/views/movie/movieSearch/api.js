import { getAwait, postAwait } from '@/utils/request'

export async function getTableData(params) {
  return await postAwait('https://api.douban.com/v2/movie/search', params)
}

export async function updateState(params) {
  const url = `${process.env.VUE_APP_XXX_API}/gateway/org/back/institutionService/logicDelIns`
  return await postAwait(url, params)
}

