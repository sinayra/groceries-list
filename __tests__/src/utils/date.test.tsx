import { displayCompleteDate, displayShortDate, isValidDate } from "../../../src/utils/date"

describe('Date', () => {
    describe('isValidDate', () => {

        describe('Valid', () => {
            it('Zero', () => {
                const date = new Date(0);
                const calculated = isValidDate(date);
                expect(calculated).toBeTruthy();
            });
    
            it('Today', () => {
                const date = new Date();
                const calculated = isValidDate(date);
                expect(calculated).toBeTruthy();
            });
        });

        describe('Invalid', () => {});
        it('Inf-', () => {
            const date = new Date(Number.MIN_SAFE_INTEGER);
            const calculated = isValidDate(date);
            expect(calculated).toBeFalsy();
        });

        it('Inf+', () => {
            const date = new Date(Number.MAX_SAFE_INTEGER);
            const calculated = isValidDate(date);
            expect(calculated).toBeFalsy();
        });

    });

    describe('displayCompleteDate', () => {
        describe('Days of the week', () => {
            it('Domingo', () => {
                const milliseconds = 1605394800000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Domingo");
            });

            it('Segunda', () => {
                const milliseconds = 1605481200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Segunda");
            });

            it('Terça', () => {
                const milliseconds = 1605567600000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Terça");
            });

            it('Quarta', () => {
                const milliseconds = 1605654000000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Quarta");
            });

            it('Quinta', () => {
                const milliseconds = 1605740400000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Quinta");
            });

            it('Sexta', () => {
                const milliseconds = 1605826800000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Sexta");
            });

            it('Sábado', () => {
                const milliseconds = 1605913200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Sábado");
            });
        });

        describe('Zero padding', () => {
            it('01 Jan 2020', () => {
                const milliseconds = 1577833200000;
                const expected = "(Quarta) 01 de Janeiro de 2020";
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toBe(expected);
            });

            it('10 Jan 2020', () => {
                const milliseconds = 1578610800000;
                const expected = "(Sexta) 10 de Janeiro de 2020";
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toBe(expected);
            });

            it('01 Oct 2020', () => {
                const milliseconds = 1601503200000;
                const expected = "(Quinta) 01 de Outubro de 2020";
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toBe(expected);
            });
        });

        describe('Months names', () => {
            it('Janeiro', () => {
                const milliseconds = 1577833200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Janeiro");
            });

            it('Fevereiro', () => {
                const milliseconds = 1580511600000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Fevereiro");
            });

            it('Março', () => {
                const milliseconds = 1583017200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Março");
            });

            it('Abril', () => {
                const milliseconds = 1585692000000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Abril");
            });

            it('Maio', () => {
                const milliseconds = 1588284000000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Maio");
            });

            it('Junho', () => {
                const milliseconds = 1590962400000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Junho");
            });

            it('Julho', () => {
                const milliseconds = 1593554400000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Julho");
            });

            it('Agosto', () => {
                const milliseconds = 1596232800000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Agosto");
            });

            it('Setembro', () => {
                const milliseconds = 1598911200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Setembro");
            });

            it('Outubro', () => {
                const milliseconds = 1601503200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Outubro");
            });

            it('Novembro', () => {
                const milliseconds = 1604185200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Novembro");
            });

            it('Dezembro', () => {
                const milliseconds = 1606777200000;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toContain("Dezembro");
            });
        });

        describe('Handle invalid', () => {
            it('Inf-', () => {
                const milliseconds = Number.MIN_SAFE_INTEGER;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toBe("");
            });

            it('Inf+', () => {
                const milliseconds = Number.MIN_SAFE_INTEGER;
                const calculated = displayCompleteDate(milliseconds);
                expect(calculated).toBe("");
            });
        });
    });

    describe('displayShortDate', () => {

        describe('No padding needed', () => {

            it('10 Oct 2020', () => {
                const milliseconds = 1602280800000;
                const expected = "10/10/2020";
                const calculated = displayShortDate(milliseconds);
                expect(calculated).toBe(expected);
            });
        });

        describe('Zero padding', () => {
            it('01 Jan 2020', () => {
                const milliseconds = 1577833200000;
                const expected = "01/01/2020";
                const calculated = displayShortDate(milliseconds);
                expect(calculated).toBe(expected);
            });

            it('10 Jan 2020', () => {
                const milliseconds = 1578610800000;
                const expected = "10/01/2020";
                const calculated = displayShortDate(milliseconds);
                expect(calculated).toBe(expected);
            });

            it('01 Oct 2020', () => {
                const milliseconds = 1601503200000;
                const expected = "01/10/2020";
                const calculated = displayShortDate(milliseconds);
                expect(calculated).toBe(expected);
            });
        });


        describe('Handle invalid', () => {
            it('Inf-', () => {
                const milliseconds = Number.MIN_SAFE_INTEGER;
                const calculated = displayShortDate(milliseconds);
                expect(calculated).toBe("");
            });

            it('Inf+', () => {
                const milliseconds = Number.MIN_SAFE_INTEGER;
                const calculated = displayShortDate(milliseconds);
                expect(calculated).toBe("");
            });

        });
    });

});

