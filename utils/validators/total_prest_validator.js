export const VlPrestValidator = (chunck) => {
  const { vlTotal, qtPrestacoes, vlPresta } = chunck

  const vlTotalAsNumber = Number(vlTotal)
  const vlPrestaAsNumber = Number(vlPresta)
  const qtPrestacoesAsNumber = Number(qtPrestacoes)

  const vlPrestacao = vlTotalAsNumber / qtPrestacoesAsNumber

  return vlPrestaAsNumber === vlPrestacao
}
