import { Grid } from '@mui/material';
import productImg from '../../assets/home/product.jpg'

interface IProductCardDetail {
    title: string;
    rating: number;
    price: number;
    subTitle: string;
}

interface IProductCard {
    products: IProductCardDetail[]
}

const ProductCard: React.FC<IProductCard> = ({ products }: IProductCard) => {
    return (
        <div className="w-[100%] max-w-[1200px] mx-auto mt-5">
            <Grid container spacing={2}>
                {
                    products.map(({ title, subTitle, rating, price }, index) => {
                        return <Grid item xs={4} key={index}>
                            <div className=" px-4 py-3 bg-[#9c9c9c] aspect-[4/3] w-[100%] rounded-lg">
                                <div className="w-[100%] relative bg-red-50">
                                    <img src={productImg} width={'100%'} height={'100%'} alt={title} className='rounded-lg' />
                                </div>
                                <div className="bg-[#fff]">
                                    <h4 className=''>{title}</h4>
                                </div>
                            </div>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )
}

export default ProductCard