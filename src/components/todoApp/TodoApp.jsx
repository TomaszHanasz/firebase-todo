import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore/lite";
import { auth } from "../../firebase-config";
import "./todoApp.style.css";
import { useNavigate } from "react-router-dom";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const getAllTodos = async () => {
    try {
      const todosCollections = collection(db, "todolist");
      const todosSnapshot = await getDocs(todosCollections);
      const todoList = todosSnapshot.docs.map((el) => {
        return { ...el.data(), id: el.id };
      });
      setTodoList(todoList);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const onCheckboxClick = async (todoId) => {
    const updateTodo = doc(db, "todolist", todoId);
    await setDoc(updateTodo, { isCompleted: true }, { merge: true });
    await getAllTodos();
  };

  const onDeleteClick = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todolist", todoId));
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = async () => {
    try {
      const addingTodo = { text: todo, isCompleted: false };
      const todosCollections = collection(db, "todolist");
      await addDoc(todosCollections, addingTodo);
      setTodo("");
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    auth.signOut();
    console.log("user signed out");
    navigate("/signin");
  };

  return (
    <div className="todo-app">
      <input
        value={todo}
        placeholder="please add your todo"
        onChange={onChangeHandler}
      />
      <button onClick={onClickHandler}>ADD</button>
      {todoList.map((el, index) => {
        return (
          <div key={index} id={el.id} className="single-todo">
            <input
              type="checkbox"
              checked={el.isCompleted}
              onChange={() => onCheckboxClick(el.id)}
            />
            <span>{el.text}</span>
            <button onClick={() => onDeleteClick(el.id)}>X</button>
          </div>
        );
      })}

      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default TodoApp;
