import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import {
  CheckCircle,
  Circle,
  Clipboard,
  PlusCircle,
  Trash
} from 'phosphor-react';

import { Header } from './components/Header';

import styles from './App.module.css';
import './global.css'

interface TaskProps {
  id: string,
  content: string;
  checked: boolean;
  deleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [content, setContent] = useState('');
  const [countChecked, setCountChecked] = useState(0);

  function handleAddTask(task: string) {
    setTasks([...tasks, {
      id: uuidv4(),
      content: task,
      checked: false,
      deleted: false,
    }]);

    setContent('');
  }

  function handleTaskChecked(id: string){
    const updateTask = tasks;

    updateTask.map(task => {
      if (task.id === id)
        {
          task.checked = !task.checked;

          if (task.checked){
            setCountChecked(countChecked + 1);
          } else {
            setCountChecked(countChecked - 1);
          }
        }
    })

    setTasks(updateTask);
  }

  function handleTaskDeleted(id: string){
    const updateTask = tasks;

    const index = updateTask.findIndex(task => task.id === id)

    updateTask.map(task => {
      if (task.id === id) {
        if (task.checked)
          setCountChecked(countChecked -1);
      }
    })

    updateTask.splice(index, 1);

    setTasks(updateTask);
  }

  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <div className={styles.addTask}>
          <input
            className={styles.inputTask}
            placeholder="Adicione uma nova tarefa"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button onClick={() => handleAddTask(content)} className={styles.buttonTask}>
            <strong className={styles.textButton}>Criar</strong>
            <PlusCircle size={20} color="#fff" />
          </button>
        </div>
        

        <div className={styles.taskContainer}>
          <header className={styles.header}>
            <div>
              <strong className={styles.textHeader}>Tarefas criadas</strong>
              <span className={styles.count}>{tasks.length}</span>
            </div>
            <div>
              <strong className={styles.textHeaderDone}>Concluídas</strong>
              <span className={styles.count}>{countChecked} de {tasks.length}</span>
            </div>
          </header>

          {
            tasks.length ?
            tasks.map(task => {
              return (
                !task.deleted &&
                <div key={task.id} className={styles.task}>
                  <button
                    className={styles.buttonChecked}
                    onClick={() => handleTaskChecked(task.id)}
                  >
                    {task.checked ?
                      <CheckCircle size={24} color="#5E60CE" />
                    :
                      <Circle size={24} color="#4EA8DE" />
                    }
                  </button>
                  
                  <div className={task.checked ? styles.textDetailsChecked : styles.taskDetails}>
                    <p>{task.content}</p>
                  </div>

                  <button
                    className={styles.buttonDeleted}
                    onClick={() => handleTaskDeleted(task.id)}
                  >
                    <Trash size={24} color="#808080" />
                  </button>
                  
                </div>
              )
            })
            :
              <div className={styles.tasks}>
                <Clipboard size={56} color="#808080" />
                <strong className={styles.title}>Você ainda não tem tarefas cadastradas</strong>
                <span className={styles.subtitle}>Crie tarefas e organize seus itens a fazer</span>
              </div>
          }
        </div>
      </div>
    </div>
  )
}