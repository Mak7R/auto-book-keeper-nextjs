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
        getUser: {
            method: 'GET',
            url: (userId: string) => `${apiServer}/api/v1/users/${userId}`
        }
    },
    books: {
        getBooks: {
            method: 'GET',
            url: (userId: string) => `${apiServer}/api/v1/users/${userId}/books`
        },
        getBook: {
            method: 'GET',
            url: (bookId: string) => `${apiServer}/api/v1/books/${bookId}`
        }
    }
}