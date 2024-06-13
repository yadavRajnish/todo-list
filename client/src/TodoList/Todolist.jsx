import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo, updateTodoAndRefresh } from '../redux/todoSlice';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function Todolist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    dispatch(addTodo({ title, description }));
    setTitle('');
    setDescription('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleted = (id) => {
    dispatch(updateTodoAndRefresh({
      id,
      completed: true
    }));
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3 mb-4">My ToDos</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
              <Form.Control required type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success">Add Todo</Button>
      </Form>

      <div>
        {todos.map((todo) => (
          <Card key={todo._id} className="mb-3">
            <Card.Body className="d-flex justify-content-between">
              <div>
                {todo.completed ? (
                  <del>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                  </del>
                ) : (
                  <>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                  </>
                )}
              </div>
              <div>
                {todo.completed ? (
                  <Button variant="danger" onClick={() => handleDelete(todo._id)}>Delete</Button>
                ) : (
                  <>
                    <Button onClick={() => handleCompleted(todo._id)}>Completed</Button>
                    <Button variant="danger" onClick={() => handleDelete(todo._id)}>Delete</Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Todolist;
