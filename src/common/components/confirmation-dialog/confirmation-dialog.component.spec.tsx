import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { Props } from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

describe('ConfirmationDialogComponent spec', () => {
  //Arrange
  const props: Props = {
    isOpen: false,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: '',
    labels: { closeButton: '', acceptButton: '' },
    children: '',
  };
  describe('should be hidden when isOpen is false and should display when isOpen is true', () => {
    
    it('Whould be hidden when isOpen is false', () => {
      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const confirmationDialog = screen.queryByRole('dialog');

      //Assert
      expect(confirmationDialog).not.toBeInTheDocument();
    });

    it('Whould display when is Open is true', () => {
      //Arrange
      props.isOpen = true;

      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const confirmationDialog = screen.queryByRole('dialog');

      //Assert
      expect(confirmationDialog).toBeInTheDocument();
    });
  });

  describe('check it works with different text', () => {

    it('Should display the title', () => {
      //Arrange
      props.title = 'Mensaje de prueba';

      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const titleElement = screen.queryByRole('heading', { level: 2 });
      const titleText = screen.getByText('Mensaje de prueba');

      //Assert
      expect(titleElement).toBeInTheDocument();
      expect(titleText).toBeInTheDocument();
    });

    it('Should display children', () => {
      //Arrange
      props.children = 'Mensaje de children';

      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const childrenElement = screen.queryByText('Mensaje de children');

      //Assert
      expect(childrenElement).toBeInTheDocument();
    });
  });

  describe('check button operation', () => {

    it('should display a button with text "Aceptar"', () => {
      //Arrange
      props.labels.acceptButton = 'Aceptar';

      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const acceptButton = screen.queryByRole('button', { name: /Aceptar/i });

      //Assert
      expect(acceptButton).toBeInTheDocument();
    });

    it('should execute the onAccept when click on Aceptar button', async () => {
      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const acceptButton = screen.queryByRole('button', { name: /Aceptar/i });
      await userEvent.click(acceptButton);

      //Assert
      expect(props.onAccept).toHaveBeenCalled();
    });

    it('should display a button with text "Cancelar"', () => {
      //Arrange
      props.labels.acceptButton = 'Cancelar';

      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const acceptButton = screen.queryByRole('button', { name: /Cancelar/i });

      //Assert
      expect(acceptButton).toBeInTheDocument();
    });

    it('should execute the onAccept when click on Cancelar button', async () => {
      //Act
      render(<ConfirmationDialogComponent {...props} />);
      const acceptButton = screen.queryByRole('button', { name: /Cancelar/i });
      await userEvent.click(acceptButton);

      //Assert
      expect(props.onAccept).toHaveBeenCalled();
    });
  });
});
