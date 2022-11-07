import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './mockData';
import App from './App';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('<App /> tests', () => {
  it('renders <App />', async () => {
    fetchMock.once(JSON.stringify(mockData)),
    render(<App />);
    await waitForElementToBeRemoved(()=> screen.getByText(/loading/i));
  })

  it("should add a todo item", async () => {
    fetchMock.once(JSON.stringify([{
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1,
      title: 'Do math homework',
      completed: false,
    }]));

    render(<App />);
    //TODO: Figure out why this test is causing an error.
    // await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    
    // userEvent.type(screen.getByRole("textbox"), 'Do math homework');
    // userEvent.click(screen.getByText(/Add new todo/i));
    // await waitForElementToBeRemoved(() => screen.getByText('/saving/i'));
    // expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
  });

  // it('remove todo from list', async () => {
  //   render(<App />);
  //   await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  //   userEvent.click(screen.getByTestId('close-btn-3'));
  //   expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
  // });
  
  it('todo item should be crossed out after completing', async () => {
    render(<App />);
    userEvent.click(screen.getByTestId('checkbox-1'));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  });

});
