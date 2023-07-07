import { tokens } from "./tokens";

export const fetchAllAprs = async() => {
  const responses = await Promise.all(
    tokens.map(({ fetchFn }) => fetchFn())
  )
  return responses.reduce((acc, val) => ({ ...acc, ...val }), {})
}