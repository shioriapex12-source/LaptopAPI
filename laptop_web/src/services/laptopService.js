import { requestJson } from './apiClient';

export function getLaptops() {
    return requestJson('/laptops');
}

export function createLaptop(payload) {
    return requestJson('/laptops', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(payload)
    });
}