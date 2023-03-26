# What is going on here?

In [server.ts](./server.ts) we have a server that rate limit the clients by IP address to only send `5` requests per `100ms`.

In [promiseQueueClient.ts](./promiseQueueClient.ts) we have a client that bypass these limitations by using a queue to orchestrate the HTTP requests.

# When this is useful

It's useful when you don't have control over the backend or don't want to abuse it.
