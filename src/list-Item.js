import React from "react";

const ListItem=({item,updateTodo,deleteTodo})=> {
    return (
        <li key={item.id}
            className="list-group-item text-center"
        > <button
            className="btn btn-info btn-sm mr-4 "
            onClick={updateTodo}
        >u
        </button>
            {item.name}
            <button
                className="btn btn-danger btn-sm ml-4"
                onClick={deleteTodo}
            >x
            </button>

        </li>
    );
};

    export default ListItem