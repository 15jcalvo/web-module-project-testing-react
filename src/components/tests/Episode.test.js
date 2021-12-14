import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const dummyEpisode = {
    id: 1,
    image: null,
    season: 1,
    number: 1,
    name: "hello",
    summary: "world",
    runtime: 42
}


test("renders without error", () => {
    render(<Episode episode={dummyEpisode}/>);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={dummyEpisode}/>);
    const summary = screen.queryByText(/world/i);
    expect(summary).toBeTruthy();
    expect(summary).toBeInTheDocument();
    expect(summary).not.toBeFalsy();

});

test("renders default image when image is not defined", ()=>{});
