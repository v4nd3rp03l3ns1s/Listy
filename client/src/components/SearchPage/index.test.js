import { screen, render } from "@testing-library/react";
import { SearchPage } from './index';

describe('Search Page', () => {
  test('Should render the search page', () => {
    const { container } = render(<SearchPage />);
    expect(container).toMatchSnapshot();
  })

  test('Should not render children while loading', () => {
    render(<SearchPage isLoading={true}/>);
    screen.getByText(/Loading/);
  })

  test('Should render a greeting if authenticated', () => {
    render(<SearchPage isLoading={false} isAuthenticated={true} />);
    screen.getByText(/Hello/);
  })
})