import users from './data.json'

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
  profilePic: string;
}

export default class UserService {

  private static generateProfilePic(param: { gender: string, id: number }): string {
    return `https://randomuser.me/api/portraits/${param.gender == 'male' ? 'men' : 'women'}/${param.id}.jpg`
  }

  public static getUsers(): IUser[] {
    return users.map((user) => {
      return {
        ...user,
        profilePic: this.generateProfilePic({
          gender: user.gender,
          id: user.id
        })
      }
    })
  }

  public static getUser(id: number): IUser {
    const data = users.find((user) => user.id === id)
    if (!data) {
      throw new Error('User not found')
    }
    return {
      ...data,
      profilePic: this.generateProfilePic({
        gender: data.gender,
        id: data.id
      })
    }
  }
  
}