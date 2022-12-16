import React, { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
  const [deletedPoints, setDeletedPoints] = useState<ClickedProps[]>([]);

  function getCoordinates(e:React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e

    setClickedPoints([...clickedPoints, { clientX, clientY }])
  }

  function handleUndo() {
    const newClickedPoint = [...clickedPoints]
    const deletedPoint = newClickedPoint.pop();
    if (!deletedPoint) return;
    setClickedPoints(newClickedPoint); 
    setDeletedPoints([...deletedPoints, deletedPoint]);
  }

  function handleRedo() {
    const newDeletedPoints = [...deletedPoints]
    const redoPoint = newDeletedPoints.pop();
    if (!redoPoint) return;
    setDeletedPoints(newDeletedPoints);
    setClickedPoints([...clickedPoints, redoPoint]);
  }

  return (
    <>
      <button onClick={handleUndo} disabled={clickedPoints.length === 0}>
        Undo
      </button>

      <button onClick={handleRedo} disabled={deletedPoints.length === 0}>
        Redo
      </button>

      <div className="App" onClick={getCoordinates}>
        {clickedPoints.map((clickedPoint, index) => {
          return (
            <div 
              key={index}
              style={{ 
                left: clickedPoint.clientX -4, 
                top: clickedPoint.clientY -4,
                position: 'absolute',
                borderRadius: '50%',
                background: 'red',
                width: '8px',
                height: '8px',
              }}
            >
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
