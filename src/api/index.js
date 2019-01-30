/*

This module just simulates a real backend service by using the fake data provided by ads.json

*/

const FAKE_DATA_URL = 'http://localhost:8080/ads.json';

const listItems = (page = 1) => fetch(FAKE_DATA_URL)
    .then(res => res.json())
    .then(pages => {

        page = +page;

        if (page > 0 && page <= pages.length) {
            return pages[page - 1];    
        }
        
        throw new Error('Page not found');
    });

const getItem = id => fetch(FAKE_DATA_URL)
    .then(res => res.json())
    .then(pages => {

        for (let p = 0; p < pages.length; p++) {
            const page = pages[p];

            for (let i = 0; i < page.ads.length; i++) {
                const item = page.ads[i];
                if (item.id === id) return item;
            }
        }

        throw new Error('Item not found');
    });

export {
    listItems,
    getItem,
}

