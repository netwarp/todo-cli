const fs = require('fs')
const Todo = require('./Todo')

let todo = new Todo

process.stdin.setEncoding('utf8');

process.stdin.resume();

// Using a single function to handle multiple signals
function handle(signal) {
  console.log('Bye');

  process.exit(0) 
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);


const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', (input) => {
	switch (input) {
		case '--help':
		case '-h':
			todo.clear()
			todo.logo()
			todo.help()
			break
		case '--list':
		case '-l':
			todo.clear()
			todo.list()
			break
		case input.startsWith('--add') ? input : '':
		case input.startsWith('-a') ? input : '':
			var index = input.indexOf(' ')
			const new_todo = input.substring(index)
			todo.add(new_todo)
			todo.clear()
			todo.list()
			todo.save()
			break
		case input.startsWith('--check') ? input : '' :
		case input.startsWith('-c') ? input : '' :
			var index = input.split(' ')
			index = index[1]
			index = parseInt(index)
			todo.check(index)
			todo.clear()
			todo.list()
			todo.save()
			break
		case input.startsWith('--remove') ? input : '' :
		case input.startsWith('-r') ? input : '' :
			var index = input.split(' ')
			index = index[1]
			index = parseInt(index)
			todo.remove(index)
			todo.clear()
			todo.list()
			todo.save()
		case '--order':
		case '-o':
			todo.order()
			break
		default:
			todo.clear()
			todo.list()
	}
});