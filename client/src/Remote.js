import React from 'react';
//import Request from 'request';

const APIContext = React.createContext('Fetch');

/** API */
class API {

    /** @param {URL|string} url */
    constructor(url) {
        url = new URL(url);
        Object.defineProperty(this, 'url', { get: () => url });
    }

    async fetchSolved(resource, { params, body, ...options } = {}) {
        let href = "";
        if (resource.charAt(0) === '/') {
            href = this.url.toString() + resource;
        } else {
            href = this.url.toString() + "/" + resource;
        }
        const endpoint = new URL(href);
        console.log(endpoint);
        if (params) new URLSearchParams(params).forEach((value, name) => endpoint.searchParams.append(name, value));
        console.log("ENDPOINT WITH PARAMS BELOW");
        console.log(endpoint);
        const response = await fetch(new Request(endpoint, params), {
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body),
            ...options
        }).then(async (response) => {
            let body = await response.text();
            try {
                console.log("here");
                body = (body?.length) ? JSON.parse(body) : undefined;
            } catch {
                console.log("there");
                body = JSON.parse(`"${body}"`);
            }
            console.log(body);
            return Object.defineProperty(response, 'body', { get: () => body });
        });
        if (response.status >= 400) {
            throw new Error(response.message);
        }
        return response;
    }

    async query(url, options = {}) {
        return (await this.fetchSolved(url, options)).body;
    }

}

const Remote = ({ children, url }) => {
    const api = new API(url);
    return (
        <APIContext.Provider value={ api }>
            {children}
        </APIContext.Provider>
    );
}

export { APIContext };
export default Remote;

