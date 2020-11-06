export function isValidDate(date: Date) {
  return isNaN(date.getTime()) === false;
}

export function displayCompleteDate(milliseconds: number) {
  const date = new Date(milliseconds);

  if (isValidDate(date)) {
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
    const month = monthName[date.getMonth()];

    return `(${dayOfWeek[date.getDay()]}) ${day} de ${month} de ${date.getFullYear()}`;
  }
  else {
    return "";
  }
}

export function displayShortDate(milliseconds: number) {
  const date = new Date(milliseconds);
  if (isValidDate(date)) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);

    return `${day}/${month}/${date.getFullYear()}`;
  }
  else {
    return "";
  }
}
