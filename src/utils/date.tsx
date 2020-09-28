export function displayDate(milliseconds: number) {
  const date = new Date(milliseconds);

  const dayOfWeek = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    monthName = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const day = ("0" + date.getDate()).slice(-2);

  return `(${dayOfWeek[date.getDay()]}) ${day} de ${monthName[date.getMonth()]} de ${date.getFullYear()}`;
}
