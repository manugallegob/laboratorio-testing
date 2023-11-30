describe('login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('Debería tener focus al hacer clic en el input user y en el input password', () => {
    // Act
    cy.visit('/');
    cy.findByRole('textbox').click();
    cy.findByRole('textbox').should('have.focus');
    cy.findByLabelText('Contraseña *').click();
    cy.findByLabelText('Contraseña *').should('have.focus');
  });

  it('Debería mostrar errores en los inputs al hacer clic en el botón login sin introducir usuario y contraseña', () => {
    // Act
    cy.visit('/');
    cy.findByRole('button', { name: 'Login' }).click();
    cy.findAllByText('Debe informar el campo').should('have.length', 2);
  });

  it('Debería aparecer el spinner y luego un mensaje de error al introducir datos de usuarios incorrectos', () => {
    // Arrange
    cy.visit('/');
    const user = 'admin2';
    const password = '123478';

    // Act
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByRole('button', { name: 'Login' }).click();
    cy.findByRole('presentation').should('be.visible');
    cy.findByText('Usuario y/o password no válidos').should('be.visible');
  });

  it('Debería navegar a la página de submodule-list al introducir los datos correctos', ()=>{
    cy.visit('/');
    const userCorrect = 'admin';
    const passwordCorrect = 'test';

    // Act
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(userCorrect);
    cy.get('@passwordInput').type(passwordCorrect);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  })
});
