import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
    NAME_INPUT_TEST_ID,
    EMAIL_INPUT_TEST_ID,
    VALID_NAME,
    VALID_EMAIL,
    INVALID_EMAIL,
} from './helpers/constants';
import { tokenResponse } from '../../cypress/mocks/token';

describe('1 - Crie uma página inicial de login com os seguintes campos e características:', () => {
  
  afterEach(() => jest.clearAllMocks());
  
  it('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  it('Crie um local para que o usuário insira seu email e name', () => {
    renderWithRouterAndRedux(<Login />, '/');
    const name = screen.getByTestId(NAME_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it('Verifica validaçoes do botão para disabled ', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByText(/Play/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const name = screen.getByTestId(NAME_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    userEvent.type(name, VALID_NAME);
    userEvent.type(email, INVALID_EMAIL);
    expect(button).toBeDisabled();

    userEvent.type(name, '');
    userEvent.type(email, VALID_EMAIL);
    expect(button).not.toBeDisabled;
  });

  it('Verifica validaçoes do botão para enabled', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByTestId(/btn-play/i)
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    
    const name = screen.getByTestId(NAME_INPUT_TEST_ID);
    expect(name).toBeInTheDocument();
    
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    expect(email).toBeInTheDocument();
    
    userEvent.type(name, VALID_NAME);
    userEvent.type(email, VALID_EMAIL);
    
    expect(button).toBeEnabled();
  });

  it('A rota deve ser mudada para \'/game\' após o clique no botão.', () => {
    
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
localStorage.setItem('token', tokenResponse.token);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const name = screen.getByTestId(NAME_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    
    userEvent.type(name, VALID_NAME);
    userEvent.type(email, VALID_EMAIL);
 
    const apiResponse = {
      json: async () => (tokenResponse.token)
  };
  history.push('/game');

  jest.spyOn(global, 'fetch').mockResolvedValue(apiResponse);
    expect(history.location.pathname).toBe('/game')
  });

  it('A rota deve ser mudada para \'/configs\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-settings');
    
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    
    expect(history.location.pathname).toBe('/configs');
  });
});
