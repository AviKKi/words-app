const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000" : ""

const headers = {
    'content-type': 'application/json'
}

const API = {
    list: async () => {
        const res = await fetch(`${BASE_URL}/api/words`, { headers })
        return await res.json()
    },
    delete: async (id: string) => {
        const res = await fetch(`${BASE_URL}/api/words/${id}`, { method: 'DELETE', headers })
        return await res.json()
    },
    update: async (id: string, word: string) => {
        const res = await fetch(
            `${BASE_URL}/api/words/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify({ word }),
                headers,
            })
        return await res.json()
    },
    create: async (word: string) => {
        const res = await fetch(
            `${BASE_URL}/api/words/`,
            {
                method: 'POST',
                body: JSON.stringify({ word }),
                headers,
            })
        return await res.json()
    }
}

export default API