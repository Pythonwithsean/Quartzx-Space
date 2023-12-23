import { useNavigate } from "react-router-dom";

export default function ReturnHome(): void {
  const navigate = useNavigate();
  navigate("/");
}
