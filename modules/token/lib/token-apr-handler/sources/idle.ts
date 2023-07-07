import axios from "axios";

const contracts = {
  '0x0c80f31b840c6564e6c5e18f386fad96b63514ca': '0xec9482040e6483b7459cc0db05d51dfa3d3068e1', // DAI
  '0xc3da79e0de523eef7ac1e4ca9abfe3aac9973133': '0xdc7777c771a6e4b3a82830781bdde4dbc78f320e', // USDC
  '0x544897a3b944fdeb1f94a0ed973ea31a80ae18e1': '0xfa3afc9a194babd56e743fa3b7aa2ccbed3eaaad', // USDT
} as { [key: string]: string }

export const idle = async (token: string) => {
  const { data } = await axios.get(`https://api.idle.finance/junior-rates/${contracts[token]}?isRisk=false&order=desc&limit=1`, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkFwcDciLCJpYXQiOjE2NzAyMzc1Mjd9.L12KJEt8fW1Cvy3o7Nl4OJ2wtEjzlObaAYJ9aC_CY6M'
    }
  })
  const [json] = data as { idleRate: string }[]
  const value = json.idleRate
  const scaledValue = Math.round(Number(value) / 1e16)

  return {
    [token]: scaledValue
  }
}
