import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import Header from "../features/Header";
import { RootState, useAppDispatch } from "../store";
import { changeWishes, deleteWish, getUnmoderatedWishes } from "../wishSlice";
import { WishId } from "../wishTypes";

function CabinetAdmin(): JSX.Element {
  const [arrayId, setArrayId] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const wishes = useSelector((state: RootState) => state.wish.list);
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  useEffect(() => {
    dispatch(getUnmoderatedWishes());
  }, [dispatch]);

  function requestDelete(id: WishId) {
    dispatch(deleteWish(id));
  }
  function changeStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const { id } = event.target;
    setArrayId((prev) => [...prev, Number(id)]);
  }

  function fetchData() {
    dispatch(changeWishes(arrayId));
    setArrayId([]);
  }
  return (
    <div>
      <Header isProfile={false} isAuth={isAuth} handleOpen={() => {}} />
      <h2>Вопросы на модерацию</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>
            <Button
              onClick={fetchData}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Проверено
            </Button>
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>Вопрос</TableCell>
              <TableCell align="right">Модерация</TableCell>
              <TableCell align="right">Удалить вопрос</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishes &&
              wishes.map((el) => (
                <TableRow key={el.id}>
                  <TableCell component="th" scope="row">
                    {el.wish}
                  </TableCell>
                  <TableCell align="right">
                    {el.isPublic && !el.isModerated && (
                      <span>
                          <input
                            onChange={changeStatus}
                            type="checkbox"
                            id={String(el.id)}
                            name="scales"
                          />
                        <label>Выбрать</label>
                      </span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => requestDelete(el.id)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CabinetAdmin;
