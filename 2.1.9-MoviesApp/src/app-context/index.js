import React from 'react';

const GenresContext = React.createContext();
const { Provider: GenresProvider, Consumer: GenresConsumer } = GenresContext;

export { GenresProvider, GenresConsumer };
