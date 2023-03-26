# What is going on here?

In [server2.ts](./server2.ts) we have a server that rate limit the clients by IP address to only send `5` requests per `100ms` and randomly thorw errors to force the client to retry these requests.

In [retryWithQueue.ts](./retryWithQueue.ts) we have a client that bypass these limitations by using a priority queue to orchestrate the HTTP requests and retry them with a higher priority than the previously invoked HTTP requests.

# When this is useful

It's useful when you don't have control over the backend or don't want to abuse it.
