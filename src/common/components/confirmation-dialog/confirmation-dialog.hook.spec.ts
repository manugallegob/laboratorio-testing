import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup, createEmptyLookup } from '../../models';

describe('useConfirmationDialog specs', () => {
  it('should return isOpen with default values', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const defaultIsOpen = false;
    expect(result.current.isOpen).toEqual(defaultIsOpen);
  });

  it('Debería cambiar isOpen a true al llamar a la función onOpenDialog y luego cambiarlo a falso al llamar a la función onclose', () => {
    // Arrange
    const newItem: Lookup = { id: '', name: '' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(newItem);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('Debería cambiar isOpen a falso al llamar a la función onclose', () => {
    // Arrange
    const newItem: Lookup = { id: '', name: '' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(newItem);
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.onClose).toEqual(expect.any(Function));
  });

  it('Debería eliminar el item al llamar a la función onAccept', () => {
    // Arrange
    const newItem: Lookup = { id: '01', name: 'Jhon Doe' };

    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItem);
    });

    // Assert
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
    expect(result.current.itemToDelete).toEqual(newItem);

    //Act
    act(() => {
      result.current.onAccept();
    });

    //Assert 
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
