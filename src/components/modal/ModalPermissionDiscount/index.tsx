"use client"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, CircularProgress, TextField } from "@mui/material";
import {GenerateTariffContext} from "@/contexts/generateTariff/generateTariff";
import {forwardRef, ReactElement, Ref, useContext, useState} from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalPermissionDiscount() {
  const {
    isOpenModalPermission: isOpen,
    handleCloseModalPermission: close,
    handleConfirmModalPermission: confirm,
    callHandleForm,
  } = useContext(GenerateTariffContext);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        aria-describedby="alert-dialog-slide-description"
      >
        {!loading ? (
          <>
            <DialogTitle>
              {"Descontos nesse valor requerem uma autorização superior!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Todo desconto, com valor acima do permitido pela diretoria, deve
                ser aprovado pela mesma. Se for o caso, procure um responsável
                para inserir a senha.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="passwordAdmin"
                label="Senha Administrativa"
                type="password"
                error={error}
                fullWidth
                variant="standard"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close}>Cancelar</Button>
              <Button
                onClick={() => {
                  setLoading(true);
                  setError(false);
                  confirm(password).then((response) => {
                    setLoading(false);

                    if (response) {
                      close();
                      setPassword("");
                      callHandleForm();
                    } else {
                      setError(true);
                    }
                  });
                }}
              >
                Aplicar
              </Button>
            </DialogActions>
          </>
        ) : (
          <Box sx={{ display: "flex", padding: 15 }}>
            <CircularProgress />
          </Box>
        )}
      </Dialog>
    </div>
  );
}
