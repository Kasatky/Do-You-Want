import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { changeWishes, deleteWishes, getUnmoderatedWishes } from '../wishSlice';
import { WishId } from '../wishTypes';
 


function CabinetAdmin() : JSX.Element {

  const [arrayId, setArrayId] = useState<number[]>([])

const dispatch = useAppDispatch()
const wishes = useSelector((state : RootState)=> state.wish.list)


useEffect(() => {
dispatch(getUnmoderatedWishes())

},[dispatch, arrayId]) 


function deleteWish (id : WishId) {
    dispatch(deleteWishes(id))
    
}
function changeStatus (event : React.ChangeEvent<HTMLInputElement>) {
    const { id } = event.target
    setArrayId((prev) => [...prev, Number(id)]) 
}

function fetchData () {
  dispatch(changeWishes(arrayId))
  setArrayId([])
}

// async function fetchData() {
//   await fetch('api/isModeration',{
//         method: 'PUT',
//         headers: { 'Content-Type': 'Application/json' },
//         body: JSON.stringify({
//          arrayId
//         }),
//       })
  
// } 
    return (
        <div>
         <h2>Вопросы на модерацию</h2>
      <div>
            {wishes && (wishes.map((el)=> (
              <div key={el.id} > 
                  <div>{el.wish}  
                {(el.isPublic && !el.isModerated) && (<span>
      <input onChange={changeStatus} type="checkbox" id={String(el.id)} name="scales" />
      <label>Проверенно</label></span> )}
      <button onClick={()=> deleteWish(el.id)}>Удалить</button></div> </div>
            ) 
            ))}
            <button onClick={fetchData}>Проверенно</button>
         </div>
        </div>
    );
}

export default CabinetAdmin;