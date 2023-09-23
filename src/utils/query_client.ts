import { query_client_options } from '@/constants';
import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

const get_query_client = cache(() => new QueryClient(query_client_options));

export default get_query_client;
