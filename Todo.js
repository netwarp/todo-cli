class Todo {

	constructor() {
		this.logo()
		this.displayMenu()

		this.todo = []

		const todo_file = __dirname + '/todo.json'
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

	add() {
		
	}

	check() {

	}

	order() {

	}

	remove() {

	}

	save() {

	}
}