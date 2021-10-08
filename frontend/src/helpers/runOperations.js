export default function runOperations(operator, a, b) {
  let result

  switch (operator) {
    case 'add':
      result = add(a, b)
      break
    case 'subtract':
      result = subtract(a, b)
      break
    case 'multiply':
      result = multiply(a, b)
      break
    case 'divide':
      result = divide(a, b)
      break
    default:
      alert('Something went wrong!')
      break
  }

  return removeTrailingZero(result)
}

//========================================================================//

function add(a, b) {
  let num1
  let num2
  const p = a.indexOf('.') > -1 || b.indexOf('.') > -1 ? getUlps(a, b) : null

  if (p) {
    // if decimals, do some magic below
    num1 = convertToInt(a, p)
    num2 = convertToInt(b, p)
  } else {
    // If no decimals, parse and go
    num1 = parseFloat(a)
    num2 = parseFloat(b)
  }

  const result = num1 + num2

  return (result / Math.pow(10, p)).toFixed(p)
}

//========================================================================//

function subtract(a, b) {
  let num1
  let num2
  const p = a.indexOf('.') > -1 || b.indexOf('.') > -1 ? getUlps(a, b) : null

  if (p) {
    // if decimals, do some magic below
    num1 = convertToInt(a, p)
    num2 = convertToInt(b, p)
  } else {
    // If no decimals, parse and go
    num1 = parseFloat(a)
    num2 = parseFloat(b)
  }

  const result = num1 - num2

  return (result / Math.pow(10, p)).toFixed(p)
}

//========================================================================//

function multiply(a, b) {
  return (a * b).toFixed(getUlps(a, b))
}

//========================================================================//

function divide(a, b) {
  return (a / b).toFixed(getUlps(a, b))
}

//========================================================================//

function getUlps(a, b) {
  // Get the units in the last place. Returns the length for the longer of the two
  // Only used for adding and subtracting
  const num1 = a.indexOf('.') > -1 ? a.length - a.indexOf('.') - 1 : 0
  const num2 = b.indexOf('.') > -1 ? b.length - b.indexOf('.') - 1 : 0
  return num1 >= num2 ? num1 : num2
}

//========================================================================//

function convertToInt(str, p) {
  let num = parseFloat(str)
  // If decimals, get places.
  const places = str.indexOf('.') > -1 ? str.length - str.indexOf('.') - 1 : 0

  if (places < p) {
    const padding = p - places
    const multiplyier = Math.pow(10, places + padding)

    return num * multiplyier
  } else {
    return num * Math.pow(10, p)
  }
}

//========================================================================//

function removeTrailingZero(str) {
  if (str.indexOf('.') > -1) {
    let countZeros = 0
    // Count ending zeros after decimal and remove
    for (let i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) === '0') {
        countZeros++
      } else {
        break
      }
    }
    if (countZeros > 0) {
      // Remove trailing zeros from final result
      const removeZeros = str.substring(0, str.length - countZeros)
      // If decimal is all that is left, remove that also
      if (removeZeros.indexOf('.') === removeZeros.length - 1) {
        return removeZeros.substring(0, removeZeros.indexOf('.'))
      }
      return removeZeros
    } else {
      // No trailing zeros found
      return str
    }
  } else {
    // No decimal in number
    return str
  }
}
