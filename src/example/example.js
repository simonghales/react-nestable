import React, { Component } from 'react';
import { render } from 'react-dom';
import Nestable from '../Nestable';

const styles = {
  position: "relative",
  padding: "10px 15px",
  fontSize: "20px",
  border: "1px solid #f9fafa",
  background: "#f9fafa",
  cursor: "pointer"
};
const handlerStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "10px",
  height: "100%",
  background: "steelblue",
  cursor: "pointer"
};

const items = [
  {
    id: 0,
    text: 'Andy',
    childrenEnabled: true,
    classes: 'highlighted',
  },
  {
    id: 1,
    text: 'Harry',
    childrenEnabled: true,
    children: [
      {
        id: 2,
        text: 'David',
        childrenEnabled: false,
      }
    ]
  },
  {
    id: 3,
    text: 'Lisa',
    childrenEnabled: true,
    children: [
      {
        id: 4,
        text: 'Richard',
        childrenEnabled: true,
      }
    ]
  }
];

class Example extends Component {
  state = {
    example: 1,
    defaultCollapsed: false
  };

  collapse = (collapseCase) => {
    if (this.refNestable) {
      switch (collapseCase) {
        case 0:
          this.refNestable.collapse('NONE');
          break;
        case 1:
          this.refNestable.collapse('ALL');
          break;
        case 2:
          this.refNestable.collapse([1]);
          break;
      }
    }
  };

  isCollapsed = () => {
    const form = document.forms[0] || null;

    return form && form.elements["collapsed"].checked;
  };

  renderItem = ({ item, collapseIcon, handler }) => {
    return (
      <div style={styles}>
        {handler}
        {collapseIcon}
        {item.text}
      </div>
    );
  };

  renderExampleOne = () => {
    const { defaultCollapsed } = this.state;
    const onDefaultCollapsed = () => this.setState({
      defaultCollapsed: !defaultCollapsed
    });

    return (
      <div>
        <h2>Basic example</h2>

        <Nestable
          items={items}
          collapsed={defaultCollapsed}
          renderItem={this.renderItem}
          ref={el => this.refNestable = el}
        />

        <br/>
        <button type="button" onClick={() => this.collapse(0)}>Expand all</button>
        <button type="button" onClick={() => this.collapse(1)}>Collapse all</button>
        <button type="button" onClick={() => this.collapse(2)}>Collapse Harry only</button>
        <form style={{ display: "inline-block" }}>
          <label>
            <input type="checkbox" name="collapsed" onChange={onDefaultCollapsed}/>
            Collapsed by default
          </label>
        </form>
      </div>
    );
  };

  renderExampleTwo = () => (
    <div>
      <h2>Example with handlers</h2>

      <Nestable
        items={items}
        renderItem={this.renderItem}
        handler={<span style={handlerStyles}/>}
      />
    </div>
  );

  render() {
    const { example } = this.state;
    const onExampleChange = e => this.setState({ example: +e.target.value });

    return (
      <div>
        <select onChange={onExampleChange} value={example}>
          <option value={1}>Basic example</option>
          <option value={2}>Example with handlers</option>
        </select>

        <hr/>

        {example === 1 && this.renderExampleOne()}
        {example === 2 && this.renderExampleTwo()}
      </div>
    );
  }
}

render(
  <Example />,
  document.getElementById('app')
);
