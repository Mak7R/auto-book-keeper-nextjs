

export const reactQueryKeys = {
  books: {
    all: () => ['books'],
    byId: (id: string) => ['books', id],
    create: () => ['books', 'create'],
    delete: () => ['books', 'delete'],
    update: () => ['books', 'update']
  },
  transactions: {
    all: (bookId: string) => ['books', bookId, 'transactions'],
    byId: (id: string) => ['transactions', id],
    create: () => ['transactions', 'create'],
    delete: () => ['transactions', 'delete'],
    update: () => ['transactions', 'update'],
  }
}