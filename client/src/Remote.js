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
        // const endpoint = new URL(path.join(this.url.toString(), resource));
        if (params) new URLSearchParams(params).forEach((value, name) => endpoint.searchParams.append(name, value));
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
                body = (body?.length) ? JSON.parse(body) : undefined;
            } catch {
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
        return (await this.fetch(url, options)).body;
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

// import memoize from 'memoize-one';
// import path from 'path';
// import React, { useState } from 'react';
// import { useMutation, useQuery, useQueryClient } from 'react-query';

// const RemoteContext = React.createContext('Fetch');
// const SessionContext = React.createContext('Session');

// /** API */
// class API {
//   /** @param {URL|string} url */
//   constructor(url) {
//     url = new URL(url);
//     Object.defineProperty(this, 'url', { get: () => url });
//   }

//   /**
//    * @param {string} resource
//    * @param {object} options
//    * @returns {Promise<Response>}
//    */
//   async fetch(resource, { params, body, ...options } = {}) {
//     console.log(this.url);
//     const endpoint = new URL(path.join(this.url.toString(), resource));
//     console.log(endpoint);
//     if (params) new URLSearchParams(params).forEach((value, name) => endpoint.searchParams.append(name, value));
//     const response = await fetch(new Request(endpoint, params), {
//       mode: 'same-origin',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: { 'Content-Type': 'application/json' },
//       redirect: 'follow',
//       referrerPolicy: 'no-referrer',
//       body: JSON.stringify(body),
//       ...options
//     }).then(async (response) => {
//       let body = await response.text();
//       try {
//         body = (body?.length) ? JSON.parse(body) : undefined;
//       } catch {
//         body = JSON.parse(`"${body}"`);
//       }
//       console.log(body);
//       return Object.defineProperty(response, 'body', { get: () => body });
//     });
//     if (response.status >= 400)
//       throw new Error(response.message);
//     return response;
//   }

//   async query(url, options = {}) {
//     return (await this.fetch(url, options)).body;
//   }

//   static memoize = memoize((url) => new API(url));
// }

// const Session = {
//   memoizeSet: memoize((queryClient) => (data) => queryClient.setQueryData('session', data)),
//   memoizeInfo: memoize((api) => async () => await api.query('/sessions', { method: 'GET' })),
//   memoizeCreate: memoize((api) => async (body) => await api.query('/sessions', { method: 'POST', body })),
//   memoizeDestroy: memoize((api) => async () => await api.query('/sessions', { method: 'DELETE' })),
//   memoizeProvider: memoize(({ session, createMutation, destroyMutation }) => ({
//     user: session.data?.user,
//     createSession: createMutation,
//     destroySession: destroyMutation
//   }))
// };

// const Remote = ({ children, url }) => {
//   const api = API.memoize(url);
//   const queryClient = useQueryClient();
//   const setSession = Session.memoizeSet(queryClient);
//   const sessionInfo = Session.memoizeInfo(api);
//   const sessionCreate = Session.memoizeCreate(api);
//   const sessionDestroy = Session.memoizeDestroy(api);
//   const [settled, setSettled] = useState(false);

//   const session = useQuery('session', sessionInfo, {
//     staleTime: 3600000,
//     cacheTime: Infinity,
//     keepPreviousData: true,
//     onSettled: () => setSettled(true)
//   });
//   const createMutation = useMutation(sessionCreate, { onSuccess: setSession });
//   const destroyMutation = useMutation(sessionDestroy, { onSuccess: setSession });

//   return (
//     <RemoteContext.Provider value={api}>
//       {(!settled) ? (
//         null
//       ) : (
//         <SessionContext.Provider value={Session.memoizeProvider({ session, createMutation, destroyMutation })}>
//           {children}
//         </SessionContext.Provider>
//       )}
//     </RemoteContext.Provider>
//   );
// };

// export { RemoteContext, SessionContext };
// export default Remote;
