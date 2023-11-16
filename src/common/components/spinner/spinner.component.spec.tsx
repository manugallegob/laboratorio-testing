import React from 'react';
import { SpinnerComponent } from './spinner.component';
import { render, screen } from '@testing-library/react';
import * as ReactPromiseTracker from 'react-promise-tracker';

jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: jest.fn(),
}));

describe('SpinnerComponet specs', () => {
  it('Should not be in the DOM when there is no promise', () => {
    // Arrange
    jest
      .spyOn(ReactPromiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: false });

    // Act
    render(<SpinnerComponent />);

    const spinner = screen.queryByRole('presentation');
    expect(spinner).toBeNull;
  });

  it('Should be in the DOM while there is a pending promise', () => {
    // Arrange
    jest
      .spyOn(require('react-promise-tracker'), 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });

    // Act
    render(<SpinnerComponent />);

    const spinner = screen.queryByRole('presentation');
    expect(spinner).toBeInTheDocument();
  });
});
