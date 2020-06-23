// change task detail in the database
// ------------------------------------------------------
export async function editTask(userId, itemId, task, date) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      taskId: itemId,
      newTitle: task,
      newDate: date
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
    .catch(error => console.log(error))
}
//////////////////////////////////////////////////////

// delete a task in the database
// -------------------------------------------------------
export async function deleteTask(userId, itemId) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        userId: userId,
        taskId: itemId
    })
    }
    return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
    .catch(error => console.log(error))  
}
//////////////////////////////////////////////////////////////

// get a list of all the tasks of this user
// -----------------------------------------------------------
export async function allTasks(userId) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: userId
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list/all', requestOptions)
    .then(res => res.json())
    .then(data => data.tasks)
    .then(tasksArr => tasksArr.map(task => {
      return {
        ...task,
        date: new Date(Date.parse(task.date))
      }
    }))
    .catch(error => console.log(error))
}
///////////////////////////////////////////////////////////////////

// add a new task to the api
// ----------------------------------------------------------------
export async function addTask(userId, text, date) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: userId,
      task: {
        title: text,
        date: date,
      }
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
    .catch(error => console.log(error))  
}