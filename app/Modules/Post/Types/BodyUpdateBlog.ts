import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

interface BodyUpdateBlog {
  title: string
  body: string
  cover: MultipartFileContract | undefined
}

export default BodyUpdateBlog
