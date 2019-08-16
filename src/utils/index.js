export const getRedirectTo = (type, header) => {
  if (type === 'employee' || type === 'employer') {
    return header ? `/${type}` : `/${type}info`;
  } 
}

export const countUnread = (id, msgs) => {
  if (msgs.length === 0) return 0
  const count = msgs.reduce((count, msg) => {
    if (!msg.read && msg.to === id) {
      // 未读消息加1
      return count + 1
    } else {
      return count
    }
  }, 0)
  return count
}

export const objFilter = (obj, filter) => {
  const newObj = Object.keys(obj).filter(item=> filter[item]!== 0)
  return newObj
}