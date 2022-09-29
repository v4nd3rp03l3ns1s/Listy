import { render, screen } from "@testing-library/react"; 
import userEvent from '@testing-library/user-event'
import { Add } from ".";

describe("<LoginForm />", () => {
  test("should be the same as snapshot", async () => {
    const { container } = render(<Add/>)
    expect(container.firstChild).toMatchSnapshot();
  });

  test("it renders a popup when button is clicked" ,() =>{
    const { container } = render(<Add/>)
    const popBtn = screen.getByTestId('addPop')

    let nullPostBtn = screen.queryByText(/POST/)
    let nullClosebtn = screen.queryByRole('button', {name :'CLOSE'})
    expect(nullPostBtn).toBeNull() 
    expect(nullClosebtn).toBeNull();

    userEvent.click(popBtn) //creates popup

    const postBtn = screen.getByText(/POST/)    // elements that exist on popup
    const closebtn = screen.getByRole('button', {name :'CLOSE'})
    screen.getByText(/add_photo_alternate/)

    userEvent.click(closebtn) //removes items on popup
    nullPostBtn = screen.queryByText(/POST/)
    nullClosebtn = screen.queryByRole('button', {name :'CLOSE'})
    expect(nullPostBtn).toBeNull() 
    expect(nullClosebtn).toBeNull();
    
    userEvent.click(popBtn) //creates popup

    const content = screen.getByPlaceholderText('movie/tv-show name') //get input fields
    const rating = screen.getByPlaceholderText('rating')
    const genre = screen.getByPlaceholderText('genre')

    userEvent.type(content, 'Interstellar');
    userEvent.type(rating,'5')
    userEvent.type(genre, 'sci-fi')

    userEvent.click(postBtn)
  })
});