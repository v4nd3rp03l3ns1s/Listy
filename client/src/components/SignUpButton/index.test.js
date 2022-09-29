import { Screen, render } from "@testing-library/react";
import SignUpButton from './index';

describe('Sign-Up Button', () => {
  test('Should render a button with "Sign Up" text.', () => {
    const { container } = render(<SignUpButton isAuthenticated={true}/>);
    expect(container).toMatchSnapshot();
  })
})