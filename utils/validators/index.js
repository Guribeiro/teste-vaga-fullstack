import { cpfValidator } from './cpf_validator.js'
import { cnpjValidator } from './cnpj_validator.js'
import { VlPrestValidator } from './total_prest_validator.js'

const validateCpfCnpj = (chunck) => {
  const {nrCpfCnpj} = chunck

  if(nrCpfCnpj.length < 11 || nrCpfCnpj.length > 14) {
    return false
  }

  if(nrCpfCnpj.length === 11) return cnpjValidator(nrCpfCnpj)

  if(nrCpfCnpj.length === 14) return cpfValidator(nrCpfCnpj)
}


export const validators = (chunck) => {
  if(!validateCpfCnpj(chunck)) {
    throw new Error(`Campo [nrCpfCnpj] invalido - ${chunck.nrCpfCnpj}`)
  }

  if(!VlPrestValidator(chunck)) {
    throw new Error('VlPrest nao confere com o calculo [VlTotal / qtPrestacoes]')
  }
}