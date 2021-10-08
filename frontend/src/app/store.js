import { configureStore } from '@reduxjs/toolkit'
import converterReducer from '../features/converter/converterSlice'
import borderPreviewReducer from '../features/borderPreview/borderPreviewSlice'
import calculatorReducer from '../features/calculator/calculatorSlice'

export const store = configureStore({
  reducer: {
    converter: converterReducer,
    borderPreview: borderPreviewReducer,
    calculator: calculatorReducer,
  },
})
