export interface ICreateTCC {
  titulo: string;
  tema: string;
  curso: string;
  orientador: string;
  coorientador?: string;
  resumo: string;
  dataInicio: Date;
  dataConclusao: Date;
  statusAtual: string;
}
