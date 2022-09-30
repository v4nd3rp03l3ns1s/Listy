import { screen, render } from "@testing-library/react";
import SignUpButton from './index';
import '@testing-library/jest-dom';

describe('Sign-Up Button', () => {
  test('Should render a button', () => {
    const { container } = render(<SignUpButton />);
    expect(container).toMatchSnapshot();
  })

  test('Should contain label "Sign Up"', () => {
    render(<SignUpButton />);
    screen.getByText(/Sign Up/);
  })

  test('Should not render if authenticated', () => {
    render(<SignUpButton isAuthenticated={true} />);
    // eslint-disable-next-line testing-library/no-container
    expect(screen.queryByText(/Sign Up/)).not.toBeInTheDocument();
  })
})