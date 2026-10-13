import { useParams } from 'react-router-dom';
import FoodEditor from '../components/foods/FoodEditor';
export default function FoodEdit() { const { id } = useParams(); return <FoodEditor key={id} editing />; }
