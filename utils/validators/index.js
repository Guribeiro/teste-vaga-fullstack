import { cpfValidator } from './cpf_validator.js'
import { cnpjValidator } from './cnpj_validator.js'
import { vlPrestValidator } from './total_prest_validator.js'

const validateCpfCnpj = (chunck) => {
  const { nrCpfCnpj } = chunck

  if(nrCpfCnpj.length < 11 || nrCpfCnpj.length > 14) {
    return false
  }

  if(nrCpfCnpj.length === 11) return cpfValidator(nrCpfCnpj)

  if(nrCpfCnpj.length === 14) return cnpjValidator(nrCpfCnpj)
}


export const validators = (chunck) => {
  if(!validateCpfCnpj(chunck)) {
    return new Error(`Campo [nrCpfCnpj] invalido - ${chunck.nrCpfCnpj}`)  
  }

  if(!vlPrestValidator(chunck)) {
    return new Error('vlPrest nao confere com o calculo [VlTotal / qtPrestacoes]')
  }
}