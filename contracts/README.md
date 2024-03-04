# Contracts 

Contains codes, interfaces that are used in both front-end and back-end.
Specifically contains Requests, Response typescript objects. 


- The front-end makes a request to the server for list of rooms. 

- The front-end will expect the data to be in a specific format so that the data can be used in a component and rendered.

- The same typescript interface can be used in the back-end application, the endpoint that is supposed to send the response data to the front-end
will send the JSON response using the same type.

-  This way over the network, the format is JSON and both front-end expectation and back-end response format
are bound togethor to improve cohesion between the two systems. 

### TLDR: Use TypeScript interfaces for a shared data format between frontend and backend. This ensures consistency in data format over the network for a particular request/response.