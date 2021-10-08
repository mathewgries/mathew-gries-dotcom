import { createSlice } from '@reduxjs/toolkit'

const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    binValue: '',
    decValue: 0,
  },
  reducers: {
    updateBinValue(state, action) {
      state.binValue = action.payload
    },
    updateDecValue(state, action) {
      state.decValue = action.payload
    },
  },
})

export const { updateBinValue, updateDecValue } = converterSlice.actions

export default converterSlice.reducer

export const selectBinValue = (state) => state.converter.binValue
export const selectDecValue = (state) => state.converter.decValue
