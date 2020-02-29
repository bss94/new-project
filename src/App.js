import React, {Component} from 'react';
import ListItem from "./list-Item";
import axios from 'axios';

class App extends Component{
    state={
        todos:[
            // {id:1,name:'Write some code'},
            // {id:2,name:'Drink coffee'},
            // {id:3,name:'Go to school'},
        ],
        newTodo:'',
        editing:false,
        editingIndex:null,
        notification:null,
    };
    apiUrl ='https://5e57296f4c695f001432f9f9.mockapi.io';
    async componentDidMount() {
        const response = await axios.get(`${this.apiUrl}/todos`);
            this.setState({todos:response.data})
    }

    handleChange(event) {
        this.setState({newTodo:event.target.value})
    }
    async addTodo(){
       const response = await axios.post(`${this.apiUrl}/todos`,{name:this.state.newTodo});
        // const newTodo={
        //     name:this.state.newTodo,
        //     id:this.state.todos[this.state.todos.length-1].id+1
        // };
        const oldTodos=this.state.todos;
        oldTodos.push(response.data);
        this.setState({todos: oldTodos,newTodo:''});
        this.alert('Added Succesfull')

    }
    async deleteTodo(index){
        const todos=this.state.todos;
        const todo=todos[index];
        await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
        delete todos[index];
        this.setState({todos});
        this.alert('Delete Succesfull')
    }
    updateTodo(index){
        const todoUpdate= this.state.todos[index];
        console.log(todoUpdate);
        this.setState({
            newTodo:todoUpdate.name,
            editing:true,
            editingIndex:index
        })
    }
    async editTodo(){
        const todo=this.state.todos[this.state.editingIndex];
        await axios.put(`${this.apiUrl}/todos/${todo.id}`,
            {name:this.state.newTodo});
        todo.name=this.state.newTodo;
        const todos=this.state.todos;
        todos[this.state.editingIndex]=todo;
        this.setState({todos:todos, editing:false,newTodo:''});
        this.alert('Editing Succesfull')
    }
    alert(notification){
        this.setState({notification:notification});
     setTimeout(()=>this.setState({notification:null}),3000)
    }
    render(){
        return (
            <div>
                <div className="container">
                    <h2 className="text-center p-4">Todo react app</h2>
                    <input type="text"
                           className="form-control mb-4"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.newTodo}/>
                    {this.state.notification &&
                        <div className='alert alert-success mt-3'>
                            <p className='text-center mp-0'>{this.state.notification}</p>
                        </div>

                    }
                    <button
                        className="btn-info form-control"
                        onClick={this.state.editing ? this.editTodo.bind(this) : this.addTodo.bind(this)}
                        disabled={this.state.newTodo.length<5}
                    >{this.state.editing ? 'Update item':'Add todo'}
                    </button>

                    {!this.state.editing &&
                    <ul className="list-group">
                        {this.state.todos.map((item,index)=>(
                          <ListItem
                            item={item}
                            updateTodo={()=>this.updateTodo(index)}
                            deleteTodo={()=>this.deleteTodo(index)}
                            />
                        ))}
                    </ul>
                    }
                </div>
            </div>
        );
    }
}

export default App;
