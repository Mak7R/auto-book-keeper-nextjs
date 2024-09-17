

export const localUrls = {
  auth: {
    login: () => "/login",
    register: () => "/register",
  },
  books: {
    all: () => "/books",
    byId: (id: string) => `/books/${id}`,
  },
  users: {
    profile: () => "/profile",
  }
}