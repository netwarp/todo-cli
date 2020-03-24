const fs = require('fs')

class Todo {

	constructor() {
		this.logo()
		this.displayMenu()

		this.tasks = []
		this.todo_file = __dirname + '/todo.json'

		// Load todos or create file
		try {
			fs.accessSync(this.todo_file, fs.constants.R_OK | fs.constants.W_OK);
			let todo_content = fs.readFileSync(this.todo_file, 'utf8')
			todo_content = JSON.parse(todo_content)
			this.tasks = todo_content
		} catch (err) {
			fs.appendFile(this.todo_file, '[]', function (err) {
			if (err) throw err;
				console.log('Saved!');
			});
		}
	}

	logo() {
		console.log(`

		########  #######  ########   #######        ###    ########  ########  
		   ##    ##     ## ##     ## ##     ##      ## ##   ##     ## ##     ## 
		   ##    ##     ## ##     ## ##     ##     ##   ##  ##     ## ##     ## 
		   ##    ##     ## ##     ## ##     ##    ##     ## ########  ########  
		   ##    ##     ## ##     ## ##     ##    ######### ##        ##        
		   ##    ##     ## ##     ## ##     ##    ##     ## ##        ##        
		   ##     #######  ########   #######     ##     ## ##        ##       
		`)
	}

	displayMenu() {
		console.log('--help \t -h \t display menu')
		console.log('--list \t -l \t list todo')
		console.log('--add  \t -a \t add new todo')
		console.log('--check \t -c \t check todo (example: -c 12)')
		console.log('--remove \t -r \t remove todo (example -r 4)')
		console.log('--order \t -o \t order todo list')
	}

	clear() {
		process.stdout.write("\u001b[2J\u001b[0;0H");
	}

	help() {
		this.displayMenu()
	}

	list() {
		if ( ! this.tasks.length) {
			console.log('todo is empty, --add or -a')
		}
		else {
			this.tasks.forEach((task, index) => {
				console.log(`${index} - ${task.name} [${task.done ? '\x1b[32m✓\x1b[0m' : ' '}]`) // \x1b[32m ✓
			})
		}
	}

	add(task) {
		this.tasks.push({
			name: task,
			done: false
		})
	}

	check(index) {
		this.tasks[index].done = ! this.tasks[index].done
	}

	remove(index) {
		this.tasks.splice(index, 1)
	}

	order() {
		this.tasks.sort( element => element.done)
	}

	save() {
		const todo_stringified = JSON.stringify(this.tasks)
		fs.writeFileSync(this.todo_file, todo_stringified);
	}
}

module.exports = Todo