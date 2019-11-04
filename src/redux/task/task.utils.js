export const mapTasksState = (task, payload) => {
  console.log('mapTasksState', payload);
};

export const doneTask = (state, payload) => { return payload; };

export const editTask = (task, payload) => { return (task , payload) };

export const deleteTask = (state, payload) => { return payload; };

export const addTask = (state, payload) => { return payload; };

export const completeTask = (state, payload) => { return []; };