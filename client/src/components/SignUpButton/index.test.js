import { screen, render } from "@testing-library/react";
import { Button } from 'reactstrap';
import SignUpButton from './index';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('Sign-Up Button', () => {
  test('Should render a button', () => {
    const { container } = render(<SignUpButton />);
    expect(container).toMatchSnapshot();
  })

  test('Should contain label "Sign Up"', () => {
    render(<SignUpButton />);
    screen.getByText(/Sign Up/);
  })
})