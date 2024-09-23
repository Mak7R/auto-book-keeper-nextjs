

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
  },
  calculations: {
    sum: (bookId: string) => ['books', bookId, 'calculations', 'sum'],
    balance: (bookId: string) => ['books', bookId, 'calculations', 'balance'],
    balanceByDate: (bookId: string) => ['books', bookId, 'calculations', 'balance', 'by-date'],
    average: (bookId: string) => ['books', bookId, 'calculations', 'average'],
    max: (bookId: string) => ['books', bookId, 'calculations', 'max'],
    min: (bookId: string) => ['books', bookId, 'calculations', 'min'],
    volatility: (bookId: string) => ['books', bookId, 'calculations', 'volatility'],
  },
  forecasts: {
    polynomialBalance: (bookId: string) => ['books', bookId, 'forecasts', 'polynomial', 'balance'],
  }
}