import { Transform } from 'node:stream'
import { formatCurrencyBRL } from '../../utils/formatCurrencyBRL.js'

export const transformToCurrency = new Transform({
  objectMode: true,
  transform: (chunck, encoding, callback) => {
    const { 
      vlTotal, 
      vlPresta, 
      vlMora, 
      vlMulta, 
      vlOutAcr, 
      vlIof, 
      vlDescon, 
      vlAtual
    } = chunck

    const valuesAsStringObject = {
      vlTotal, 
      vlPresta, 
      vlMora, 
      vlMulta, 
      vlOutAcr, 
      vlIof, 
      vlDescon, 
      vlAtual
    }

    const valuesAsCurrencyObject = Object.fromEntries(Object.entries(valuesAsStringObject).map(([key, value]) => [key, formatCurrencyBRL(value)]))
    
    const chunckAssigned = Object.assign(chunck, valuesAsCurrencyObject)

    const data =JSON.stringify(chunckAssigned)
    
    callback(null, data)
  },
})
