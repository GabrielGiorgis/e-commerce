export interface ICategoria{
    id: number
    eliminado: boolean
    denominacion: string
    subCategorias: ICategoria[]
    sucursal: string
    esParaElaborar: boolean
    imagen: string
}