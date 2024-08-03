export const cpfValidator = (cpf) => {
  let sum;
  let rest;
  sum = 0;

  if (cpf == "00000000000") return false;

  for (let index = 1; index <= 9; index++) {
    sum += parseInt(cpf.substring(index - 1, index)) * (11 - index);
  }
  
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10)) ) return false;

  sum = 0;
  for (let index = 1; index <= 10; index++) {
    sum += parseInt(cpf.substring(index - 1, index)) * (12 - index)
  }
  
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) {
    rest = 0
  }

  if (rest !== parseInt(cpf.substring(10, 11) ) ) return false;

  return true;
}

export default cpfValidator 