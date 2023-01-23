import styled from "styled-components";
import { COLORS } from "../styles/colors";
import dayjs from "dayjs";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: ${COLORS.black};
  background: ${COLORS.blue};
  font-weight: 500;

  &.edit {
    background: ${COLORS.orange};
  }

  &.delete {
    color: ${COLORS.white};
    background: ${COLORS.red};
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export default function TaskCard({ _id, title, description, createdAt }) {
  const editTask = () => {
    console.log("editTask");
    // do something
  };

  const deleteTask = () => {
    console.log("deleteTask");
    // do something
  };

  return (
    <Card>
      <Title>{title}</Title>
      <DescriptionContainer>
        <Description>
          <div>{description}</div>
          <div>Created at: {dayjs(createdAt).format("H:mm D/M/YY")}</div>
        </Description>
        <ButtonBar>
          <Button className="edit" onClick={editTask}>
            Edit
          </Button>
          <Button className="delete" onClick={deleteTask}>
            Delete
          </Button>
        </ButtonBar>
      </DescriptionContainer>
    </Card>
  );
}
