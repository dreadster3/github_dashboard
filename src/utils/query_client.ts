import { query_client_options } from '@/constants';
import { QueryClient } from '@tanstack/react-query';

export default function get_query_client() {
    return new QueryClient(query_client_options);
}
