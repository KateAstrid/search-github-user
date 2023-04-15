import React from 'react';
import { useRouter } from 'next/router';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import SearchPage from '../pages/search';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: jest.fn()
}));

const headers = new Headers();

global.fetch = jest.fn().mockImplementation(() => {
  const response = {
    json: () => Promise.resolve({ data: {} }),
    headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: '',
    type: 'default',
    url: ''
  };
  return Promise.resolve(response);
});

const routerPushMock = jest.fn();
const renderComponent = () => render(<SearchPage />);

describe('SearchPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders the component', () => {
    act(() => renderComponent());

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('goes to a user page when the icon is clicked', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    act(() => renderComponent());

    const input = screen.getByTestId('search-input');
    const icon = screen.getByTestId('search-icon');
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();

    act(() => fireEvent.change(input, { target: { value: 'testuser' } }));
    act(() => fireEvent.click(icon));

    await waitFor(() => expect(routerPushMock).toHaveBeenCalledWith('/testuser'));
  });

  it('goes to a user page when the Enter key is pressed', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    act(() => renderComponent());

    const input = screen.getByTestId('search-input');

    act(() => fireEvent.change(input, { target: { value: 'testuser' } }));
    act(() => fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' }));

    await waitFor(() => expect(routerPushMock).toHaveBeenCalledWith('/testuser'));
  });

  it('displays an error message when the API call fails', async () => {
    const errorMessage = 'User not found';
    act(() => renderComponent());
    const input = screen.getByTestId('search-input');
    const icon = screen.getByTestId('search-icon');

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { message: errorMessage } }),
      headers,
      ok: false,
      redirected: false,
      status: 500,
      statusText: '',
      type: 'default',
      url: ''
    } as Response);

    act(() => fireEvent.change(input, { target: { value: 'testuser' } }));
    act(() => fireEvent.click(icon));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
    waitFor(() => expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage));
  });
});
