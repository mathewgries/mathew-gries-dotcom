import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  borderTopLeftRadius: {
    value: '0',
    str: 'border-top-left-radius',
  },
  borderTopRightRadius: {
    value: '0',
    str: 'border-top-right-radius',
  },
  borderBottomLeftRadius: {
    value: '0',
    str: 'border-bottom-left-radius',
  },
  borderBottomRightRadius: {
    value: '0',
    str: 'border-bottom-right-radius',
  },
}

const borderPreviewSlice = createSlice({
  name: 'borderPreview',
  initialState,
  reducers: {
    updateRadius(state, action) {
      state[action.payload.name].value = action.payload.value
    },
  },
})

export const { updateRadius } = borderPreviewSlice.actions

export default borderPreviewSlice.reducer
