export function isDev(): boolean {
    console.log("process.env.NODE_ENV", process.env)
    return process.env.NODE_ENV === "development"
}