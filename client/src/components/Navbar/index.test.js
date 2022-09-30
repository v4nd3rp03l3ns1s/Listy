import { screen, render } from "@testing-library/react";
import { Navbar } from '.';
import '@testing-library/jest-dom';

// describe('Navbar', () => {
//   test('Should not render custom links if not authenticated', () => {
//     render(<Navbar isAuthenticated={false} />);
//     expect(screen.queryByText(/mainfeed/)).not.toBeInTheDocument();
//   })

//   test('Should render custom links if authenticated', () => {
//     render(<Navbar isAuthenticated={true} />);
//     expect(screen.getByText(/mainfeed/)).toBeInTheDocument();
//   })
// })

//need to clean up profile customlink elements