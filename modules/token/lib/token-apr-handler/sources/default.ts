import axios from "axios";

export const defaultFetch = async (options: { tokens: string[]; url: string; path: string; scale?: number }) => {
  const { tokens, url, path, scale = 100 } = options
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'cf' } })
  const value = (path === '') ? data : getValueFromPath(data, path)
  const scaledValue = Math.round(parseFloat(value) * scale)

  return tokens.reduce((acc, token) => {
    acc[token] = scaledValue
    return acc
  }, {} as { [key: string]: number })
}

// Get a specific value from a JSON object based on a path
export const getValueFromPath = (obj: any, path: string) => {
  const parts = path.split('.')
  let value = obj
  for (const part of parts) {
    value = value[part]
  }
  return value
}
