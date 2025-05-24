import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <>
      <h1>404</h1>
      <button id="backToHomeButton" onClick={()=>navigate("/home")}>Home</button>
    </>
  );
}