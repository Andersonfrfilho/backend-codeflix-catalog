## configurações para debug no docker
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Docker ts-node",
      "address": "localhost",
      "port": 9333,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/app",
      "protocol": "inspector"
    }
  ]
}
```
## configurações para debug local
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Docker ts-node",
      "address": "localhost",
      "port": 9333,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/app",
      "protocol": "inspector"
    }
  ]
}
