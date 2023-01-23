import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { useForm } from "react-hook-form";
import { client } from "../utils/client";

const ShadowBox = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(40, 40, 40, 0.87);
  z-index: 1001;
  top: 0;
  left: 0;
  position: fixed;
`;

const Modal = styled.div`
  background: ${COLORS.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: 50vw;
  width: 100%;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;

  & span {
    color: ${COLORS.red};
    font-weight: 400;
  }
`;

const Input = styled.input`
  border-radius: 8px;
  padding: 8px;
  margin: 4px 0;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  color: ${COLORS.white};
  background: ${COLORS.blue};
`;

const TaskModal = ({ closeAllModal }) => {
  const onSubmit = async (data) => {
    console.log(data);
    await client
      .post("/tasks/", data)
      .then((res) => {
        closeAllModal();
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <ShadowBox onClick={closeAllModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Create new task</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Title:
            <Input type="text" {...register("title", { required: true })} />
            {errors.title && <span>Please enter title</span>}
          </Label>
          <Label>
            Description:
            <Input
              type="text"
              {...register("description", { required: true })}
            />
            {errors.description && <span>Please enter description</span>}
          </Label>
          <Button type="submit">Create</Button>
        </Form>
      </Modal>
    </ShadowBox>
  );
};

export default TaskModal;
