import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const dummyShow = {
    name: 'hello',
    summary: 'world',
    seasons: [{id: 0, name: 'season 1', episodes: [{id: 0, url: null}],}, {id: 1, name: 'season 2', episodes: [],}, {id: 2, name: 'season 3', episodes: [],}],
}

test('renders without errors', ()=>{
    render(<Show show={dummyShow} selectedSeason ='none'/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>)
    const fetchMessage = screen.getByText(/Fetching data.../i);
    expect(fetchMessage).toBeTruthy();
    expect(fetchMessage).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={dummyShow} selectedSeason ='none'/>)
    userEvent.click(screen.getByTestId('season-select'))
    const seasons = screen.queryAllByTestId('season-option')
    expect(seasons).toHaveLength(3);

});

test('handleSelect is called when an season is selected', () => {
    render(<Show show={dummyShow} selectedSeason ='none'/>)
    userEvent.click(screen.getByTestId('season-select'))
    const seasons = screen.queryAllByTestId('season-option')
    userEvent.click(seasons[0])
    const episodeRender = screen.queryAllByTestId('episode-render')
    expect(episodeRender).toBeTruthy()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    render(<Show show={dummyShow} selectedSeason ='none'/>)
    const episodeNull = screen.queryAllByTestId('episode-render')
    expect(episodeNull).toHaveLength(0);
    userEvent.click(screen.getByTestId('season-select'))
    const seasons = screen.queryAllByTestId('season-option')
    userEvent.click(seasons[0])
    const episodeRender = screen.queryAllByTestId('episode-render')
    expect(episodeRender).toBeTruthy()
});
