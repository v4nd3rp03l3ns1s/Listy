import { screen, render } from "@testing-library/react";
import Profile from './index';
import '@testing-library/jest-dom';

// describe('Profile component', () => {
//   test('Should render nothing if not authenticated', () => {
//     render(<Profile isAuthenticated={false} user={{nickname: "test"}} />);
//     expect(screen.queryByText(/Sign Up/)).not.toBeInTheDocument();
//   })
// })

//import in Add preventing this from rendering