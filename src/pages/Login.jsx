import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data)=> {
    console.log(data);
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
    .then((res)=>{
        localStorage.setItem("token",res.data.token);
        navigate('/');
        console.log(res.data);
        alert('Usuario Logeado exitosamente')
    })
    .catch(error =>{
        if(error.response?.status===401) {
            alert('Credenciales Inválidas')
        }
        console.log(error.response)
    } )
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...register("email")} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password")} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
