import React, { useState } from 'react';
import TaskItem from './TaskItem';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [filter, setFilter] = useState('all');
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });
  
  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo').length,
    'in-progress': tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length
  };

  return (
    <div className="task-list-container">
      <div style={{width: "fit-content", margin: "auto"}}>
        <button 
          className={`btn btn-filter ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={`btn btn-filter ${filter === 'todo' ? 'active' : ''}`}
          onClick={() => setFilter('todo')}
        >
          To Do ({tasksByStatus.todo})
        </button>
        <button 
          className={`btn btn-filter ${filter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          In Progress ({tasksByStatus['in-progress']})
        </button>
        <button 
          className={`btn btn-filter ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasksByStatus.completed})
        </button>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="empty-tasks">
          {tasks.length === 0 
            ? "No tasks yet. Add your first task!" 
            : `No ${filter !== 'all' ? filter : ''} tasks found.`}
        </div>
      ) : (
        <div>
          <Row>
            {filteredTasks.map((task, i) => (
           <Col key={i} sm={6} md={4} lg={3}>
             <div style={{border: "1px solid lightgrey", marginBottom: "2rem", padding: "5px 10px", marginTop: "2rem"}}>
              <TaskItem 
              key={task._id} 
              task={task} 
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
             </div>
           </Col>
          ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default TaskList;
