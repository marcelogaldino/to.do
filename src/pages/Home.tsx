import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  id: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    if (tasks.length > 0) {
      const findTask = tasks.find(task => task.title === newTaskTitle)

      if (findTask) {
        return Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome')
      }

    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleEditTask({ id, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskFounded = updatedTasks.find(task => task.id === id)
    if (!taskFounded) return

    taskFounded.title = taskNewTitle

    setTasks(updatedTasks)
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskFounded = updatedTasks.find(task => task.id === id)
    if (!taskFounded) return

    taskFounded.done = !taskFounded.done

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover Item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        onPress: () => console.log('Nao remove')
      },

      {
        text: 'Sim',
        onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})