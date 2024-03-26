import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
export default function PostIDSubComponent( {props}){
    const { likes} = props;
    return (
        <>
        <div class="flex flex-row items-center">
        <TbArrowBigUp />{likes} <TbArrowBigDown />
        </div>
           
        </>
    )
}