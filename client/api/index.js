let apiUrl = 'http://127.0.0.1:3000'
if (process.env.NODE_ENV === 'production') {
  apiUrl = 'http://192.168.0.201:8890'
}

export const characters = {
  all: apiUrl + '/characters?permissions=1',
  CPermission: function (id) {
    return apiUrl + '/characters/' + id + '/permission'
  },
  noauthpermission: function (id) {
    return apiUrl + '/characters/' + id + '/noauthpermission'
  }
}

export const permission = {
  all: apiUrl + '/permission'
}

export const goods = {
	index: apiUrl + '/goods',
  post: apiUrl + '/goods'
}

export const lists = {
	post: apiUrl + '/lists',
	list: apiUrl + '/lists',
	update: function (id) {
	  const url = apiUrl + '/lists/' + id
	  return url
	},
	show: function (id) {
    const url = apiUrl + '/lists/' + id
    return url
  }
}

export const labs = {
  index: apiUrl + '/labs'
}

export const users = {
  index: apiUrl + '/users',
  register: apiUrl + '/users',
  auth: apiUrl + '/auth'
}

export const term = {
  index: apiUrl + '/terms',
  create: apiUrl + '/terms'
}
