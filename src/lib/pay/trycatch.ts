// @ts-nocheck
export default async function handleException(promise) {
    try {
        return [await promise, null]
    } catch (e) {
        return [null, e]
    }
}