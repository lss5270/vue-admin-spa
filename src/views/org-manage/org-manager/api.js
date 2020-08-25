if(process.env.NODE_ENV !== 'production'){
	require("./mock");
}

import { getAwait, postAwait } from '@/utils/request'

export async function getTableData(params) {
  const url = `/gateway/org/back/institutionService/query`
  return await postAwait(url, params)
}

export async function updateState(params) {
  const url = `/gateway/org/back/institutionService/logicDelIns`
  return await postAwait(url, params)
}

export async function queryIns(params) {
  const url = `/gateway/org/back/institutionService/queryIns`
  return await postAwait(url, params)
}

export async function submitOrgForm(params) {
  const url = `/gateway/org/back/institutionService/addIns`
  return await postAwait(url, params)
}

