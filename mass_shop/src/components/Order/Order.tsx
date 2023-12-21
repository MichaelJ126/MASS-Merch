import * as _React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useGetOrder } from './../customHooks'
import { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Snackbar } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';


// import { serverCalls } from '../../api';
import { InputText } from '../sharedComponents'; 
import { theme } from '../../Theme/themes';
import { ShopProps } from './../customHooks';
import { SubmitProps } from '../Shop';
import { MessageType } from '../Auth';


const columns: GridColDef[] = [
  { field: 'image', 
  headerName: 'Image',
  width: 150,
   renderCell: (param) => ( 
        <img 
            src={param.row.image} 
            alt={param.row.name}
            style = {{ maxHeight: '100%', aspectRatio: '1/1'}} 
        ></img>
   ) 
},
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 110,
    editable: true,
  },
  {
    field: 'prod_id',
    headerName: 'Product Id',
    width: 110,
    editable: true,
  },
  {
    field: 'id',
    headerName: 'Order ID',
    width: 110,
    editable: true,
  },
  
];

interface UpdateProps {
    id: string,
    orderData: ShopProps[]
}


const UpdateQuantity = (props: UpdateProps) => {
    const [ openAlert, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const { register, handleSubmit } = useForm<SubmitProps>({})

    useEffect(() => {
        if (props.id === 'undefined'){
            setMessage('No Order Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()  => window.location.reload(), 2000)
        }
    }, [])

    const onSubmit: SubmitHandler<SubmitProps> = async (data: SubmitProps, event: any) => {
        if (event) event.preventDefault();

        let orderId = ""
        let prodId = ""

        for (let order of props.orderData) {
            if (order.id === props.id) {
                orderId = order.order_id as string
                prodId = order.prod_id as string 
            }
        }

    
        const updateData = {
            "prod_id" : prodId,
            "quantity" : data.quantity
        }

        const response = await serverCalls.updateData(orderId, updateData)
        if (response.status === 200){
            setMessage('Successfully updated item in your Order')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        }
    }


    return(
        <Box sx={{padding: '20px'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor="quantity">What is the updated quantity?</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='Quantity Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={openAlert}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )




}

export const Order = () => {
    const { orderData } = useGetOrder(); 
    const [ gridData, setGridData ] = useState<GridRowSelectionModel>([])
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const [ openDialog, setDialogOpen ] = useState(false);

    const deleteItem = async () => {

        const id = `${gridData[0]}`



       
        let order_id = ""
        let prod_id = ""

        if (id === 'undefined'){
            setMessage('No Order Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()=> window.location.reload(), 2000)
        }

        
        for (let order of orderData){
            if (order.id === id){
                order_id = order.order_id as string
                prod_id = order.prod_id as string
            }
        }


        const deleteData = {
            'prod_id': prod_id
        }

        const response = await serverCalls.deleteOrder(order_id, deleteData)

        if (response.status === 200) {
            setMessage('Successfully deleted item from order')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        }


    }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orderData}
        columns={columns}
        sx={{ color: 'white', borderColor: theme.palette.primary.main, backGroundColor: theme.palette.secondary.light }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.id}
        onRowSelectionModelChange = {(newSelectionModel) => setGridData(newSelectionModel)}
      />
      <Button variant='contained' color='info' onClick={()=> setDialogOpen(true)}>Update</Button>
      <Button variant='contained' color='warning' onClick={deleteItem}>Delete</Button>
      <Dialog open={openDialog} onClose={()=> setDialogOpen(false)}>
        <DialogContent>
            <DialogContentText>Order id: {gridData[0]}</DialogContentText>
        </DialogContent>
        <UpdateQuantity id={`${gridData[0]}`} orderData = {orderData} />
        <DialogActions>
            <Button onClick = { ()=> setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={()=> setOpen(false)}
        >
            <Alert severity = {messageType}>
                {message}
            </Alert>
        </Snackbar>
    </Box>
  );
}