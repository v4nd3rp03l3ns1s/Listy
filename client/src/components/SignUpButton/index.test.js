import { screen, render } from "@testing-library/react";
import SignUpButton from './index';

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