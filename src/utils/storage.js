export const getItem = (key, fallback) => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
}

export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}