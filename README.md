# tickspotv2-api

## Installation

```
npm install tickspotv2-api
```

## Usage

First, create a new Tickspot object (username and password are only required for getting roles).

```js
var Tickspot = require('tickspotv2-api');

var tick = new Tickspot('User-Agent', subscriptionID, 'token', 'username', 'password');
```

This object can then be used for any of the Tickspot APIs endpoints.

```js
tick.getProjects(function (error, projects) {
    if(!error) {
        console.log(projects);
    }
});
```

All the methods are promise-based, which means that you can also use them like:

```js
tick.getProjects()
    .then(function (projects) {
        console.log(projects);
    })
    .catch(function (error) {
        console.log(error);
    });
```

Or, if you're using Node.js 7's async/await:

```js
try {
    const projects = await tick.getProjects();
    console.log(projects);
} catch(error) {
    console.log(error);
}
```

# Methods

For information about data formatting please refer to [Tick V2 API](https://github.com/tick/tick-api).

## Clients

* getClients([options], [callback])
* getAllClients([options], [callback])
* getClient(clientID, [options], [callback])
* createClient(client, [options], [callback])
* updateClient(clientID, client, [options], [callback])
* deleteClient(clientID, [options], [callback])

## Entries

Some of these methods takes a query parameter, which should have the following syntax:

```js
var query = {
    start_date: '2016-01-01',
    end_date: '2016-02-01',
    billable: true,
    project_id: 20
}
```

* getEntries(query, [options], [callback])
* getAllEntries(query, [options], [callback])
* getUserEntries(userID, query, [options], [callback])
* getAllUserEntries(userID, query, [options], [callback])
* getProjectEntries(projectID, query, [options], [callback])
* getAllProjectEntries(projectID, query, [options], [callback])
* getTaskEntries(taskID, query, [options], [callback])
* getAllTaskEntries(taskID, query, [options], [callback])
* getEntry(entryID, [options], [callback])
* createEntry(entry, [options], [callback])
* updateEntry(entryID, entry, [options], [callback])
* deleteEntry(entryID, [options], [callback])

## Projects

A page query can be specified in the options as so:
```js
var options = {
    page: 2 // Default is 1
}
```

* getProjects([options], [callback])
* getAllProjects([options], [callback])
* getClosedProjects([options], [callback])
* getAllClosedProjects([options], [callback])
* getProject(projectID, [options], [callback])
* createProject(project, [options], [callback])
* updateProject(projectID, project, [options], [callback])
* deleteProject(projectID, [options], [callback])

## Roles

NOTE: This requires username and password to be set

* getRoles([options], [callback])

## Tasks

* getTasks([options], [callback])
* getAllTasks([options], [callback])
* getClosedTasks([options], [callback])
* getAllClosedTasks([options], [callback])
* getProjectTasks(projectID, [options], [callback])
* getAllProjectTasks(projectID, [options], [callback])
* getClosedProjectTasks(projectID, [options], [callback])
* getAllClosedProjectTasks(projectID, [options], [callback])
* getTask(taskID, [options], [callback])
* createTask(task, [options], [callback])
* updateTask(taskID, task, [options], [callback])
* deleteTask(taskID, [options], [callback])

## Users

* getUsers([options], [callback])
* getAllUsers([options], [callback])