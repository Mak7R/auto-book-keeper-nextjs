const apiServer = process.env.NEXT_PUBLIC_API_SERVER;

export const endpoints = {
    auth: {
        login:{
            method: 'POST',
            url: `${apiServer}/api/v1/login`
        },
        refreshToken: {
            method: 'POST',
            url: `${apiServer}/api/v1/refresh-token`
        },
        register: {
            method: 'POST',
            url: `${apiServer}/api/v1/register`
        }
    },
    users: {
        getById: {
            method: 'GET',
            url: (userId: string) => `${apiServer}/api/v1/users/${userId}`
        }
    },
    books: {
        getAll: {
            method: 'GET',
            url: (userId: string) => `${apiServer}/api/v1/users/${userId}/books`
        },
        create: {
            method: 'POST',
            url: (userId: string) => `${apiServer}/api/v1/users/${userId}/books`
        },
        getById: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}`
        },
        update: {
            method: 'PUT',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}`
        },
        delete: {
            method: 'DELETE',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}`
        }
    },
    transactions: {
        getAll: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions`
        },
        create: {
            method: 'POST',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions`
        },
        getById: {
            method: 'GET',
            url: (transactionId: string) => `${apiServer}/api/v1/users/books/transactions/${transactionId}`
        },
        update: {
            method: 'PUT',
            url: (transactionId: string) => `${apiServer}/api/v1/users/books/transactions/${transactionId}`
        },
        delete: {
            method: 'DELETE',
            url: (transactionId: string) => `${apiServer}/api/v1/users/books/transactions/${transactionId}`
        }
    },
    calculations: {
        sum: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/sum`
        },
        balance: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/balance`
        },
        balanceByDate: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/balance-by-date`
        },
        average: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/average-transaction`
        },
        max: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/max-transaction`
        },
        min: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/min-transaction`
        },
        volatility: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/transactions/volatility`
        }
    },
    forecasts: {
        polynomialBalance: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/users/books/${bookId}/forecasts/polynomial-balance`
        }
    }
}