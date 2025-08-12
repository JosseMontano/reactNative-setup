export interface Post {
  id: number
  title: string
  content: string
  userId: number
  user: User
}

export interface User {
  id: number
  ci: string
}
