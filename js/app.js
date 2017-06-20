(function (window) {
	'use strict';
	
	function createNewTodoElements(items) {
		/**
		 * 'override' functionality present
		 * pass in items as an array, and they will all be appended
		 * pass in items as an object, and only that item will be appended
		 */

		const _addToDocument = function(item) {
			let todoListEl = window.document.querySelector('.todo-list');
			let li = document.createElement('li');
			
			if (item.state === 'completed') {
				li.classList.add('completed');
			}

			let div = document.createElement('div');
			div.classList.add('view');

			let input = document.createElement('input');
			input.classList.add('toggle')
			input.type = 'checkbox';
			input.addEventListener('click', (event) => {
				let li = event.target.offsetParent;
				toggleCompleted(li);
			});

			let label = document.createElement('label');
			label.innerText = item.value;

			let button = document.createElement('button');
			button.classList.add('destroy');

			div.appendChild(input);
			div.appendChild(label);
			div.appendChild(button);

			li.appendChild(div);
			console.log('this is the created li:   ', li);

			todoListEl.appendChild(li);
			
			return;
		}

		if (items && items.length) {
			//	many items to add
			items.forEach((item) => {
				_addToDocument(item);
			});
		} else if (items) {
			// One item to add
			_addToDocument(items)
		}
	}

	function toggleCompleted(target) {
		const _updateState = (function(target) {
			const targetVal = target.innerText.trim();
			debugger;
			for (const item of items) {
				if (item.value === targetVal) {
					item.state = item.state === 'active' ? 'completed' : 'active';
				}
			}
		})(target);

		const liClasses = target.classList;
		if (liClasses.length > 0) {
			const individualClasses = liClasses.value.split(' ');
			if(individualClasses.indexOf('completed') > -1) {
				liClasses.remove('completed');
			} else {
				liClasses.add('completed');
			}
		} else {
			liClasses.add('completed');
		}
	}

	//	Handle data from localStorage
	let items;
	let itemsFromLocalStorage = localStorage.todos;
	if (itemsFromLocalStorage) {
		items = JSON.parse(todosFromLocalStorage);
		// If we have items in our local storage, we should write them to the screen!
	} else {
		items = [];	// an item: {value: VAL, state: ACTIVE VS COMPLETE}
	}

	//	Handle users adding items
	const todoInputEl = window.document.querySelector('.new-todo');
	todoInputEl.addEventListener('keypress', (event) => {
		if (event.keyCode === 13) {
			const inputOnEnter = window.document.querySelector('.new-todo'); 
			const newItemVal = inputOnEnter.value;

			if (!newItemVal) {
				return; //	do nothing if there is no input val
			}

			inputOnEnter.value = ""; //	reset input
			
			const newItem = {
				value: newItemVal,
				state: 'active'
			}
			items.push(newItem);
			
			createNewTodoElements(newItem);
		}
	});

	//	Handle users marking item as completed
	// let todoListEl = window.document.querySelector('ul.todo-list');
	// todoListEl.addEventListener()
	const allCheckBoxes = window.document.querySelectorAll('input.toggle');
	allCheckBoxes.forEach((checkBox) => {
		checkBox.addEventListener('click', (event) => {
			const li = event.target.offsetParent;
			toggleCompleted(li);
		});
	});

	const listTogglers = window.document.querySelector('.filters').children;
	console.log(listTogglers);
	for (const child of listTogglers) {
		child.addEventListener('click', (event) => {
			const currentClasses = event.target.classList.value.split(" ");
			if (currentClasses.indexOf('selected') === -1) {
				window.document.querySelector('.selected').classList.remove('selected');
				event.target.classList.add('selected');
			
				
				switch (event.target.innerText) {
					case "All": 
						window.document.querySelector('.todo-list').innerHTML = '';
						createNewTodoElements(items);
						break;
					case "Active":
						window.document.querySelector('.todo-list').innerHTML = '';
						debugger;
						const onlyActives = items.map((item) => {
							if (item.state === 'active') {
								return item;
							}
						});
						createNewTodoElements(onlyActives);
						break;
					case "Completed":
						window.document.querySelector('.todo-list').innerHTML = '';
						const onlyCompleted = items.map((item) => {
							if (item.state === 'completed') {
								return item;
							}
						});
						createNewTodoElements(onlyCompleted);
						break;
				}
			}
		});
	}
	
})(window);
