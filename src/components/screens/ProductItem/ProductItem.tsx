import React from 'react'
import { IArticulo } from '../../../types/IArticulo'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import ModalProduct from './ModalProduct'
interface IProductItem {
    product: IArticulo,
}
export const ProductItem = ({product}: IProductItem) => {
  const [openModal, setOpenModal] = React.useState(false);


  return (
    <>
    <Card sx={{ maxWidth: 200, mb: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea onClick={() => setOpenModal(true)}>
        <CardMedia
          sx={{ padding: 1, borderRadius: 4 }}
          component="img"
          height="140"
          image={product.imagenes[0].url}
          alt={product.imagenes[0].name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {product.denominacion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.precioVenta.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <ModalProduct product={product} openModal={openModal} handleCloseModal={() => setOpenModal(false)} />
    </>
  )
}
