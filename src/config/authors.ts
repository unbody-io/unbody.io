export interface Author {
  id: string
  name: string
  title: string
  avatar: string
  twitter?: string
  github?: string
  linkedin?: string
}

export const authors: Author[] = [
  {
    id: "amir",
    name: "Amir Houieh",
    title: "Founder",
    avatar: "/images/authors/amir.jpg",
    twitter: "aaborning",
    github: "amir-houieh",
    linkedin: "amirhouieh",
  },
]

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}
