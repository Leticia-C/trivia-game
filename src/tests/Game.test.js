import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { questionsResponse } from '../../cypress/mocks/questions'
import { tokenResponse} from '../../cypress/mocks/token';
import App from '../App';
import {
    NAME_INPUT_TEST_ID,
    EMAIL_INPUT_TEST_ID,
    VALID_NAME,
    VALID_EMAIL,
    INVALID_EMAIL,
} from './helpers/constants';
import Game from '../pages/Game';

describe('2 - Crie uma página Game com as seguintes características', () => {
    
  it('A rota para esta página deve ser \'/game\'', () => {
    const apiResponse = {
        json: async () => (questionsResponse)
    };
    
    jest.spyOn(global, 'fetch').mockResolvedValue(apiResponse);

    const { history } = renderWithRouterAndRedux(<App/>,'/');
    const button = screen.getByTestId('btn-play');
    localStorage.setItem('token', tokenResponse.token);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const name = screen.getByTestId(NAME_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    
    userEvent.type(name, VALID_NAME);
    userEvent.type(email, VALID_EMAIL);
    userEvent.click(button);
    waitForElementToBeRemoved(button).then(() =>
    expect(history.location.pathname).toBe('/game'),
)

});
/* it('Verifica se a página Game renderiza o nome do player, a pontuação e a imagem', () => {
renderWithRouterAndRedux(<App/>, '/game');
const titleEl = screen.getByTestId('header-player-name');
const scoreEl = screen.getByTestId('header-score');
const imgEl = screen.getByTestId('header-profile-picture');

expect(titleEl).toBeInTheDocument();
expect(scoreEl).toBeInTheDocument();
expect(imgEl).toBeInTheDocument();
}); */
});
