import styled from "styled-components";
import { COLORS } from "../styles/colors";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { client } from "../utils/client";
import { useEffect, useState } from "react";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 70vw;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: ${COLORS.black};
  background: ${COLORS.green};
  font-weight: 500;
  margin-top: 16px;
`;

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [isShowCreateTaskModal, setIsShowCreateTaskModal] = useState(false);

  const closeAllModal = () => {
    setIsShowCreateTaskModal(false);
  };

  const createTask = () => {
    setIsShowCreateTaskModal(true);
  };

  async function getAllTask() {
    await client
      .get("/tasks/")
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getAllTask();
  }, [isShowCreateTaskModal]);

  return (
    <Page>
      <h1>Task</h1>
      <TaskContainer>
        {tasks.length === 0 && (
          <p>You don't have any tasks. Let's create some tasks!</p>
        )}
        {tasks.map((task, idx) => {
          return <TaskCard key={idx} {...task} />;
        })}
      </TaskContainer>
      <Button onClick={createTask}>Create new task</Button>

      {isShowCreateTaskModal && (
        <CreateTaskModal closeAllModal={closeAllModal} />
      )}
    </Page>
  );
}
