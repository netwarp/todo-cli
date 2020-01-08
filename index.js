const fs = require('fs')

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

// START APP
const todo_file = __dirname + '/todo.json'
var todo_list = []

let order_by_done = true

try {
	fs.accessSync(todo_file, fs.constants.R_OK | fs.constants.W_OK);
	let todo_content = fs.readFileSync(todo_file, 'utf8')
	todo_content = JSON.parse(todo_content)
	todo_list = todo_content
} catch (err) {
	fs.appendFile(todo_file, '[]', function (err) {
	if (err) throw err;
		console.log('Saved!');
	});
}




const Helpers = {
	GUI: {
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
		},
		displayMenu() {
			console.log('--help \t -h \t display menu')
			console.log('--list \t -l \t list todo')
			console.log('--add  \t -a \t add new todo')
			console.log('--check \t -c \t check todo (example: -c 12)')
			console.log('--remove \t -r \t remove todo (example -r 4)')
			console.log('--order \t -o \t order todo list')
		},
		showTodos() {
			this.clear()
			if ( ! todo_list.length) {
				console.log('todo is empty, --add or -a')
			}
			else {
				todo_list.forEach((todo, index) => {
					console.log(`${index} - ${todo.name} [${todo.done ? '\x1b[32m✓\x1b[0m' : ' '}]`) // \x1b[32m ✓
				})
			}
		},
		clear() {
			process.stdout.write("\u001b[2J\u001b[0;0H");
		}
	},
	Menu: {
		help() {
			Helpers.GUI.clear()
			Helpers.GUI.logo()
			Helpers.GUI.displayMenu()
		},
		todos() {

		},
		add(todo, spliter) {
			var todo = todo.split(spliter)
			todo = todo[1]

			todo_list.push({
				name: todo,
				done: false
			})
		},
		check(index, spliter) {
			var index = index.split(spliter)
			index = index[1]
			index = parseInt(index)

			var todo = todo_list[index]

			todo.done = ! todo.done
		},
		remove(index, spliter) {
			var index = index.split(spliter)
			index = index[1]
			index = parseInt(index)

			todo_list.splice(index, 1)
		}
	},
	Todo: {
		save() {
			todo_list = JSON.stringify(todo_list)
			fs.writeFileSync(todo_file, todo_list);
			todo_list = JSON.parse(todo_list)
		},
		order() {
			// TODO debug order
			order_by_done = ! order_by_done

			todo_list = todo_list.sort((element) => {
				console.log(element)
				return ! element.done
			})
		}
	}
}

Helpers.GUI.logo()
Helpers.GUI.displayMenu()

rl.on('line', (input) => {
	switch (input) {
		case '--help':
			Helpers.Menu.help()
			break
		case '-h': 
			Helpers.Menu.help()
			break
		case '--list':
			Helpers.GUI.showTodos()
			break
		case '-l':
			Helpers.GUI.showTodos()
			break
		case input.startsWith('--add') ? input : '' :			
			Helpers.Menu.add(input, '--add')
			Helpers.GUI.showTodos()
			Helpers.Todo.save()
			break
		case input.startsWith('-a') ? input : '' :
			Helpers.Menu.add(input, '-a')
			Helpers.GUI.showTodos()
			Helpers.Todo.save()
			break
		case input.startsWith('--check') ? input : '' :
			Helpers.Menu.check(input, '--check')
			Helpers.GUI.showTodos()
			break
		case input.startsWith('-c') ? input : '' :
			Helpers.Menu.check(input, '-c')
			Helpers.GUI.showTodos()
			break
		case input.startsWith('--remove') ? input : '' :
			Helpers.Menu.remove(input, '--remove')
			Helpers.GUI.showTodos()
			Helpers.Todo.save()
			break
		case input.startsWith('-r') ? input : '' :
			Helpers.Menu.remove(input, '-r')
			Helpers.GUI.showTodos()
			Helpers.Todo.save()
			break
		case '--order':
			Helpers.Todo.order()
			Helpers.GUI.showTodos()
			Helpers.Todo.save()
			break
		case '-o':
			Helpers.Todo.order()
			Helpers.GUI.showTodos()
			Helpers.Todo.save()
			break
		case 'clear':
			Helpers.GUI.clear()
			break
		default:
			Helpers.Menu.help()
	}
});
