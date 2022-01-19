import React from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

class App extends React.Component {
  id = 3; // 이미 0,1,2 가 존재하므로 3으로 설정
  colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

  state = {
    input: '',
    color: this.colors[0],
    todos: [
      { id: 0, text: ' 리액트 소개', checked: false, color:'' },
      { id: 1, text: ' 리액트 소개', checked: true, color:'' },
      { id: 2, text: ' 리액트 소개', checked: false, color:'' },
    ],
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos, color } = this.state;

    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color: color
      }),
    });
  };

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleCreate();
    }
  };

  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는다.
    const idx = todos.findIndex((todo) => todo.id === id);
    const selected = todos[idx]; // 선택한 객체

    const nextTodos = [...todos]; // 배열 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[idx] = {
      ...selected,
      checked: !selected.checked,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((todo) => todo.id !== id),
    });
  };

  handleColorChange = (color) => {
    this.setState({
      color : color
    })
  }

  render() {
    const { input, todos, color} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleColorChange
    } = this;

    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            color={color}
          />
        }
        palette={<Palette colors={this.colors} color={color} onChange={handleColorChange}/>}
      >
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    );
  }
}

export default App;
