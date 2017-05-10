export const goodsstatus = function (val) {
	// 1 未批、2 待批、3 统购和4 自购
	const line = {
		1: '未批',
		2: '待批',
		3: '统购',
		4: '自购'
	}
	return line[val]
}

export const liststatus = function (val) {
	// 0 未完成还在填写 1 未审批、2 正在审批 3 审批结束
	const line = {
		0: '未完成还在填写',
		1: '未审批',
		2: '正在审批',
		3: '审批结束'
	}
	return line[val]
}

export const materialstatus = function (val) {
  //1 未买、2 买完
	const line = {
		1: '未买',
		2: '已购'
	}
	return line[val]
}
