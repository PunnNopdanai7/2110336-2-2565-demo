import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { client } from "../utils/client";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await client
      .post("/auth/login", data)
      .then((res) => {
        return navigate("/task");
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };

  return (
    <Page>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Username:
          <Input type="text" {...register("username", { required: true })} />
          {errors.username && <span>Please enter username</span>}
        </Label>
        <Label>
          Password:
          <Input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Please enter password</span>}
        </Label>
        <Button type="submit">Log in</Button>
        <div>
          Don't have an account? <Link to="/register">Register now!</Link>
        </div>
      </Form>
    </Page>
  );
}
