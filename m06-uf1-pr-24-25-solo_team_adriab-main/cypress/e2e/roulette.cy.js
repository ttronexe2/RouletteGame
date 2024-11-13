/* eslint-disable no-undef */

describe('Roulette Game', () => {
  const URL = 'http://localhost:5173/';

  beforeEach(() => {
    // Suponiendo que tu juego está siendo servido en localhost:3000
    cy.visit(URL);
  });

  describe('When page loads', () => {
    it('should display chips from cookies', () => {
      // Set the cookie value
      cy.setCookie('myChips', '50', 7);

      // Reload the page or visit the URL
      cy.visit(URL);

      // Verify that the chips displayed match the cookie value
      cy.get('#chips').should('contain', '50');
    });

    it('should display 0 when no chips in cookies', () => {
      // Clear the cookie
      cy.clearCookie('myChips');

      // Reload the page or visit the URL
      cy.visit(URL);

      // Verify that the chips displayed is 0
      cy.get('#chips').should('contain', '0');
    });
  });

  describe('When user clicks on the "Add chips" button', () => {
    it('should add chips', () => {
      cy.get('#add-chips').type('10');
      cy.get('#add-chips-btn').click();
      cy.get('#chips').should('contain', '10');
      // Verificar que las fichas se hayan guardado en las cookies
      cy.getCookie('myChips').should('have.property', 'value', '10');

      cy.get('#add-chips').clear();
      cy.get('#add-chips').type('5');
      cy.get('#add-chips-btn').click();
      cy.get('#chips').should('contain', '15');
      // Verificar que las fichas se hayan guardado en las cookies
      cy.getCookie('myChips').should('have.property', 'value', '15');
    });

    it('should not allow negative chips', () => {
      cy.get('#add-chips').type('-10');
      cy.get('#add-chips-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });
  });

  describe('When user add a bet', () => {
    it('should not allow negative bets', () => {
      cy.get('#bet').type('-10');
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });

    it('should not allow bets higher than chips', () => {
      cy.get('#add-chips').type('10');
      cy.get('#add-chips-btn').click();

      cy.get('#bet').type('20');
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });
  });

  describe('When user add a bet type', () => {
    it('should not allow empty bet type', () => {
      cy.get('#bet').type('10');
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });
  });

  describe('When user add a number bet', () => {
    beforeEach(() => {
      // Añadir apuesta por tipo
      cy.get('#bet').type('10');
      cy.get('#bet-type').select('imparell'); // Suponiendo que tienes un <select> para bet-type
    });

    it('should not allow number bet higher than 36', () => {
      cy.get('#bet-number').type('37'); // Suponiendo que hay un campo de entrada para especificar el número en el que se desea apostar.
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });

    it('should not allow number bet lower than 0', () => {
      cy.get('#bet-number').type('-1'); // Suponiendo que hay un campo de entrada para especificar el número en el que se desea apostar.
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });

    it('should not allow number bet with decimals', () => {
      cy.get('#bet-number').type('5.5'); // Suponiendo que hay un campo de entrada para especificar el número en el que se desea apostar.
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });

    it('should number bet be the same type as bet type', () => {
      cy.get('#bet-number').type('6'); // Suponiendo que hay un campo de entrada para especificar el número en el que se desea apostar.
      cy.get('#bet-btn').click();
      cy.on('window:alert', (str) => {
        expect(str).to.contain('ERROR');
      });
    });
  });

  describe('When user clicks on the "Bet" button', () => {
    beforeEach(() => {
      // Añadir fichas para poder apostar
      cy.get('#add-chips').type('100');
      cy.get('#add-chips-btn').click();
      // Añadir apuesta por tipo
      cy.get('#bet').type('10');
      cy.get('#bet-type').select('parell'); // Suponiendo que tienes un <select> para bet-type
    });

    it('should display a random number between 0 and 36', () => {
      cy.get('#test-mode').select('no-test'); // Para forzar que el número sea aleatorio
      cy.get('#bet-btn').click();
      cy.get('#result').should(($input) => {
        const value = Number($input.val());
        expect(value).to.be.greaterThan(-1);
        expect(value).to.be.lessThan(37);
      });
      cy.on('window:alert', (str) => {
        // eslint-disable-next-line no-unused-expressions
        expect(str).not.to.be.empty;
      });
    });

    it('should make a type bet and win', () => {
      cy.get('#test-mode').select('test-win'); // Para forzar una victoria

      cy.get('#bet-btn').click();

      cy.on('window:alert', (str) => {
        expect(str).to.contain('VICTORIA');
      });

      cy.get('#chips').should('contain', '105'); // 100 originales + 5 ganados
    });

    it('should make a number bet and win', () => {
      cy.get('#bet-number').type('4'); // Suponiendo que hay un campo de entrada para especificar el número en el que se desea apostar.
      cy.get('#test-mode').select('test-win'); // Para forzar una victoria

      cy.get('#bet-btn').click();

      cy.on('window:alert', (str) => {
        expect(str).to.contain('VICTORIA');
      });

      cy.get('#chips').should('contain', '120'); // 100 originales + 20 ganados (apuesta * 2)
    });

    it('should make a bet and lose', () => {
      cy.get('#test-mode').select('test-loose'); // Para forzar una derrota

      cy.get('#bet-btn').click();

      cy.on('window:alert', (str) => {
        expect(str).to.contain('HAS PERDUT');
      });

      cy.get('#chips').should('contain', '90'); //  100 originales - 10 apostados = 90
    });
  });
});
