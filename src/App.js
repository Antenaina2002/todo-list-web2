import React, { useState } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const [selectedItemId, setSelectedItemId] = useState(null);
const [textInput, setTextInput] = useState("");

  function addItem() {
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false,
    };

    setItems((oldList) => [...oldList, item]);

    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function editItem(id, newText) {
 
    const currentItem = items.filter((item) => item.id === id);

    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  function toggleCompletion(id) {
    setItems((oldList) => 
        oldList.map((item) => 
            item.id === id ? {...item, completed: !item.completed} : item
        )
    );
  }
  
  function deleteCompleted() {
    setItems(items.filter((item) => !item.completed));
  }

  function onUpgradeClick(id) {
    setSelectedItemId(id);
    setTextInput(items.find(item => item.id === id).value);
  }

  function onUpgradeSubmit(event) {
    event.preventDefault();

    if (selectedItemId && textInput) {
      setItems((oldItems) =>
        oldItems.map((item) =>
          item.id === selectedItemId ? { ...item, value: textInput } : item
        )
      );

      setSelectedItemId(null);
      setTextInput("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }
  

  return (
    <div className="app" style={{ width: "300px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "45px", fontStyle: "italic" }}>My Todo List</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: "1", marginRight: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button onClick={addItem} style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007BFF", color: "white" }}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: "0" }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(item.id)}
                style={{ marginRight: "10px" }}
              />

              {item.id === selectedItemId ? (
                <form onSubmit={onUpgradeSubmit} style={{ flex: "1" }}>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    style={{ width: "100%", marginRight: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  />
                </form>
              ) : (
                <span style={{ textDecoration: item.completed ? "line-through" : "", marginRight: "10px", flex: "1" }}>
                  {item.value}
                </span>
              )}

              <button onClick={() => deleteItem(item.id)} style={{ marginRight: "10px", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#dc3545", color: "white" }}>X</button>
              <button onClick={() => onUpgradeClick(item.id)} style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "white" }}>Upgrade</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={deleteCompleted} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#6c757d", color: "white", marginTop: "20px" }}>Delete Completed Tasks</button>
    </div>
  );
}

export default App;
