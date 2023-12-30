export const joinUser = (userLength: number) => {
    if (userLength === 1) {
      return 0
    } else {
      return userLength - 1
    }
  }

export  const joinUserNickname = (nickName: string) => {
    const delEmail = nickName.indexOf('@')
    if (delEmail !== -1) {
      return nickName.substring(0, delEmail)
    } else {
      return nickName
    }
  }