var electron	= require('electron');

var app			= electron.app;
var BrowserWindow	= electron.BrowserWindow;
var ipc			= electron.ipcMain;
var mainWindow		= null;

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		width:		1750,
		height:		1000
	});
	mainWindow.webContents.openDevTools();

	// TODO: create interface for user to save game configuration settings
	ipc.on('close-main-window', function() {
		app.quit();
	});

	ipc.on('display', function(e, data) {
		console.log(data);
	});

	/*
	// TODO: archive this? or just leave for future use.
	ipc.on('task-request', function(event, runnerID) {
		var task = activeTasks.shift();

		ipc.once('task-fulfillment-' + runnerID, function(event, fulfilledData) {
			task.sender.send('fulfill-' + task.fulfillmentID, fulfilledData);
			event.sender.send('terminate');
		});

		event.sender.send('task-request-response', task);
	});

	ipc.on('create-task', function(event, taskData) {
		taskData.sender = event.sender;

		activeTasks.push(taskData);

		var taskWindow = new BrowserWindow({
			height:	100,
			width:	100,
			show:	false
		});

		// Requests a task from ipcMain
		taskWindow.loadURL('file://' + __dirname + '/task.html');
	});
	*/

	mainWindow.loadURL('file://' + __dirname + '/index.html');
});
