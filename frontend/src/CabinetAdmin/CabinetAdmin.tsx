import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../features/Header';
import { RootState, useAppDispatch } from '../store';
import { changeWishes, deleteWish, getUnmoderatedWishes } from '../wishSlice';
import { WishId } from '../wishTypes';
 


function CabinetAdmin() : JSX.Element {

  const [arrayId, setArrayId] = useState<number[]>([])

const dispatch = useAppDispatch()
const wishes = useSelector((state : RootState)=> state.wish.list)
const isAuth = useSelector((state : RootState)=> state.user.isAuth)



useEffect(() => {
dispatch(getUnmoderatedWishes())

},[dispatch,]) 


function requestDelete (id : WishId) {
    dispatch(deleteWish(id))
    
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
           <Header isProfile={false} isAuth={isAuth} handleOpen={()=>{}} />
         <h2>Вопросы на модерацию</h2>
      <div>
            {wishes && (wishes.map((el)=> (
              <div key={el.id} > 
                  <div>{el.wish}  
                {(el.isPublic && !el.isModerated) && (<span>
      <input onChange={changeStatus} type="checkbox" id={String(el.id)} name="scales" />
      <label>Проверено</label></span> )}
      <button onClick={()=> requestDelete(el.id)}>Удалить</button></div> </div>
            ) 
            ))}
            <button onClick={fetchData}>Проверено</button>
         </div>
        </div>
    );
}

export default CabinetAdmin;