import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditarTCC from "./EditarTCC";
import { fetchTCCById } from "../TCC/services/fetchTCC";
import { fetchAreasConhecimento } from "../TCC/services/area-conhecimento/fetchAreaConhecimento";

export default function EditarTCCWrapper() {
  const { id } = useParams();
  const [tccData, setTccData] = useState(null);
  const [areasConhecimento, setAreasConhecimento] = useState([]);
  useEffect(() => {
    if (id) {
      fetchTCCById(id).then(setTccData);
      fetchAreasConhecimento().then(setAreasConhecimento);
    }
  }, [id]);
  if (!tccData || areasConhecimento.length === 0) {
    return <div>Carregando...</div>;
  }
  return <EditarTCC tccData={tccData} areasConhecimento={areasConhecimento} />;
}
