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
    }
}